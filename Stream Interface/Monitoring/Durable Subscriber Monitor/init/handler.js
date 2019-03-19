function handler() {
    var self = this;
    this.cidPredicate = this.props["cidPredicate"];
    this.durNamePredicate = this.props["durNamePredicate"];
    this.thresholdYellow = this.props["threshold-yellow"];
    this.thresholdRed = this.props["threshold-red"];

    // Management Input to get the durable subscribers
    stream.create().input("sys$topicmanager/usage/durables").management()
        .selector("clientid not like 'streamregistry%' and clientid like '" + this.cidPredicate + "' and durablename like '" + this.durNamePredicate + "'")
        .onAdd(function (input) {
            input.current().property("lastactivity").set(time.currentTime());
            input.current().property("messagecount").set(0);
            stream.memory("greens").add(input.current());
        })
        .onRemove(function (input) {
            var boundTo = input.current().property("boundto").value().toString();
            stream.memory("greens").index("boundto").remove(boundTo);
            stream.memory("yellows").index("boundto").remove(boundTo);
        });

    // Management Input to receive updates on the durable queues (consume rate)
    // to determine last activity
    stream.create().input("sys$queuemanager/usage").management()
        .selector("name not like 'streamregistry%' and name not like 'tmp$%' and name not like 'rt$%' and name not like 'sys$%' and name not like 'tpc$%' and name like '" + this.cidPredicate + "$" + this.durNamePredicate + "'")
        .include("msg_consume_rate messagecount")
        .onChange(function (input) {
            if (input.current().property("msg_consume_rate").value().toInteger() > 0) {
                updateDurable(input.current(), stream.memory("greens"));
                updateDurable(input.current(), stream.memory("yellows"));
            }
        });

    // Memory to hold all durables that have not reached yellow state
    stream.create().memory("greens").heap().orderBy("lastactivity").createIndex("boundto")
        .inactivityTimeout().days(this.thresholdYellow)
        .limit().time().days(this.thresholdYellow)
        .onRetire(function (retired) {
            executeOutput("YELLOW"
                , retired);
            retired.forEach(function (message) {
                stream.memory("yellows").add(message);
            })
        });

    // Memory to hold all durables that have reached yellow state.
    // When they retired, it is red state
    stream.create().memory("yellows").heap().orderBy("lastactivity").createIndex("boundto")
        .inactivityTimeout().days(this.thresholdRed)
        .limit().time().days(this.thresholdRed)
        .onRetire(function (retired) {
            executeOutput("RED", retired);
            retired.forEach(function (message) {
                stream.cli()
                    .exceptionOff()
                    .execute("cc sys$topicmanager/usage/durables")
                    .execute("delete " + message.property("name").value().toString());
            })
        });

    this.checkState = function () {
        stream.memory("greens").checkLimit();
        stream.memory("yellows").checkLimit();
    };

    // Update durable with last activity. Shifts it from green or yellow to green
    function updateDurable(message, memory) {
        var name = message.property("name").value().toString();
        var durable = memory.index("boundto").get(name);
        if (durable.size() === 1) {
            durable.first().property("lastactivity").set(time.currentTime())
                .property("messagecount").set(message.property("messagecount").value().toInteger());
            memory.index("boundto").remove(name);
            stream.memory("greens").add(durable.first());
        }
    }

    function executeOutput(state, retired) {
        var durableList = "";
        retired.forEach(function (message) {
            durableList += message.property("boundto").value().toString()
                + ", Message Count: " + message.property("messagecount").value().toInteger()
                + ", Expires: " + time.format(message.property("lastactivity").value().toLong() + (self.thresholdYellow+self.thresholdRed) * 60000*60*24, "dd.MM.yyyy HH:mm:ss");
        });
        self.executeOutputLink(state, stream.create().message().message().property("durablelist").set(durableList));
    }
}