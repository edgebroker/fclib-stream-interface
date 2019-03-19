function handler() {
    var self = this;
    this.cidPredicate = this.props["cidPredicate"];
    this.thresholdRed = this.props["threshold-red"];

    // Management Input to get the JMS connections
    stream.create().input("sys$jms/usage").management()
        .selector("clientid not like '" + stream.routerName() + "%' and clientid like '" + this.cidPredicate + "'")
        .include("clientid")
        .onChange(function (input) {
            var clientid = input.current().property("clientid").value().toString();
            if (stream.memory("connected").index("clientid").get(clientid).size() === 0) {
                var prevSize = stream.memory("reds").size();
                stream.memory("disconnected").index("clientid").remove(clientid);
                stream.memory("reds").index("clientid").remove(clientid);
                stream.memory("connected").add(input.current());
                if (prevSize > 0 && stream.memory("reds").size() === 0) {
                    executeOutput("GREEN", null);
                }

            }

        })
        .onRemove(function (input) {
            var clientid = input.current().property("clientid").value().toString();
            stream.memory("connected").index("clientid").remove(clientid);
            stream.memory("disconnected").add(input.current().property("disconnecttime").set(time.currentTime()));
        });

    // Memory to hold all clients that are connected
    stream.create().memory("connected").heap().createIndex("clientid");

    // Memory to hold all clients that are disconnected but not RED
    stream.create().memory("disconnected").heap().createIndex("clientid")
        .limit().time().minutes(this.thresholdRed)
        .onRetire(function (retired) {
            executeOutput("RED", retired);
            retired.forEach(function (message) {
                stream.memory("reds").add(message);
            })
        });

    // Memory to hold all clients that are disconnected and RED
    stream.create().memory("reds").heap().createIndex("clientid");

    // Send a mail and a status
    function executeOutput(state, mem) {
        var msg = stream.create().message().message();
        if (mem != null) {
            var clientList = "";
            mem.forEach(function (message) {
                clientList += message.property("clientid").value().toString()
                    + ", Disconnect Time: " + time.format(message.property("disconnecttime").value().toLong(), "dd.MM.yyyy HH:mm:ss")+"\n";
            });
            msg.property("clientlist").set(clientList);
        }
        self.executeOutputLink(state, msg);
    }

    this.checkState = function () {
        stream.memory("disconnected").checkLimit();
    }
}