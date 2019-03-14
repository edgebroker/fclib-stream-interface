function handler() {
    var self = this;
    this.setOutputReference("MemoryFactory", execRef);

    function execRef(memoryName) {
        switch (self.props["type"]) {
            case "Persistent":
                stream.create().memory(memoryName).sharedQueue(self.flowcontext.getFlowQueue());
                break;
            case "Non Persistent":
                stream.create().memory(memoryName).tempqueue();
                break;
            case "Heap":
                stream.create().memory(memoryName).heap();
                break;
        }
        var mem = stream.memory(memoryName);
        if (self.props["indexes"]) {
            for (var i = 0; i < self.props["indexes"].length; i++)
                mem.createIndex(self.props["indexes"][i]);
        }
        if (self.props["orderby"]) {
            mem.orderBy(self.props["orderby"]);
            mem.dropLateArrivals(self.props["droplate"]);
        }
        if (self.props["inactivitytimeout"] === true) {
            mem.inactivityTimeout()
                .days(self.props["inactivitydays"])
                .hours(self.props["inactivityhours"])
                .minutes(self.props["inactivityminutes"])
                .seconds(self.props["inactivityseconds"])
                .milliseconds(self.props["inactivitymilliseconds"]);
        }
        if (self.props["windowtype"]) {
            var sliding = self.props["windowtype"] === "Sliding";
            if (self.props["countlimit"] === true) {
                if (sliding)
                    mem.limit().count(self.props["countlimit"]).sliding();
                else
                    mem.limit().count(self.props["countlimit"]).tumbling();
            }
            if (self.props["timelimit"] === true) {
                if (sliding)
                    mem.limit().time().sliding()
                        .days(self.props["timelimitdays"])
                        .hours(self.props["timelimithours"])
                        .minutes(self.props["timelimitminutes"])
                        .seconds(self.props["timelimitseconds"])
                        .milliseconds(self.props["timelimitmilliseconds"]);
                else
                    mem.limit().time().tumbling()
                        .days(self.props["timelimitdays"])
                        .hours(self.props["timelimithours"])
                        .minutes(self.props["timelimitminutes"])
                        .seconds(self.props["timelimitseconds"])
                        .milliseconds(self.props["timelimitmilliseconds"]);
            } else if (self.props["timeunitchangelimit"] === true) {
                switch (self.props["timeunitchangeunit"]) {
                    case "Second":
                        mem.limit().timeUnitChange().seconds(self.props["timeunitchangevalue"]);
                        break;
                    case "Minute":
                        mem.limit().timeUnitChange().minutes(self.props["timeunitchangevalue"]);
                        break;
                    case "Hour":
                        mem.limit().timeUnitChange().hours(self.props["timeunitchangevalue"]);
                        break;
                    case "Day":
                        mem.limit().timeUnitChange().days(self.props["timeunitchangevalue"]);
                        break;
                    case "Week":
                        mem.limit().timeUnitChange().weeks(self.props["timeunitchangevalue"]);
                        break;
                    case "Month":
                        mem.limit().timeUnitChange().months(self.props["timeunitchangevalue"]);
                        break;
                    case "Year":
                        mem.limit().timeUnitChange().years(self.props["timeunitchangevalue"]);
                        break;
                }
            }
            mem.onRetire(function (retired) {
                self.executeOutputLink("onRetire", retired);
            });
            return mem;
        }
    }
}