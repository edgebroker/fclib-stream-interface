function handler() {
    var self = this;
    switch (this.props["type"]) {
        case "Persistent":
            stream.create().memory(this.compid).sharedQueue(this.flowcontext.getFlowQueue());
            break;
        case "Non Persistent":
            stream.create().memory(this.compid).tempqueue();
            break;
        case "Heap":
            stream.create().memory(this.compid).heap();
            break;
    }
    var mem = stream.memory(this.compid);
    if (this.props["indexes"]) {
        for (var i = 0; i < this.props["indexes"].length; i++)
            mem.createIndex(this.props["indexes"][i]);
    }
    if (this.props["orderby"]) {
        mem.orderBy(this.props["orderby"]);
        mem.dropLateArrivals(this.props["droplate"]);
    }
    if (this.props["inactivitytimeout"] === true) {
        mem.inactivityTimeout()
            .days(this.props["inactivitydays"])
            .hours(this.props["inactivityhours"])
            .minutes(this.props["inactivityminutes"])
            .seconds(this.props["inactivityseconds"])
            .milliseconds(this.props["inactivitymilliseconds"]);
    }
    if (this.props["windowtype"]) {
        var sliding = this.props["windowtype"] === "Sliding";
        if (this.props["countlimit"] === true) {
            if (sliding)
                mem.limit().count(this.props["countlimit"]).sliding();
            else
                mem.limit().count(this.props["countlimit"]).tumbling();
        }
        if (this.props["timelimit"] === true) {
            if (sliding)
                mem.limit().time().sliding()
                    .days(this.props["timelimitdays"])
                    .hours(this.props["timelimithours"])
                    .minutes(this.props["timelimitminutes"])
                    .seconds(this.props["timelimitseconds"])
                    .milliseconds(this.props["timelimitmilliseconds"]);
            else
                mem.limit().time().tumbling()
                    .days(this.props["timelimitdays"])
                    .hours(this.props["timelimithours"])
                    .minutes(this.props["timelimitminutes"])
                    .seconds(this.props["timelimitseconds"])
                    .milliseconds(this.props["timelimitmilliseconds"]);
        } else if (this.props["timeunitchangelimit"] === true) {
            switch (this.props["timeunitchangeunit"]) {
                case "Second":
                    mem.limit().timeUnitChange().seconds(this.props["timeunitchangevalue"]);
                    break;
                case "Minute":
                    mem.limit().timeUnitChange().minutes(this.props["timeunitchangevalue"]);
                    break;
                case "Hour":
                    mem.limit().timeUnitChange().hours(this.props["timeunitchangevalue"]);
                    break;
                case "Day":
                    mem.limit().timeUnitChange().days(this.props["timeunitchangevalue"]);
                    break;
                case "Week":
                    mem.limit().timeUnitChange().weeks(this.props["timeunitchangevalue"]);
                    break;
                case "Month":
                    mem.limit().timeUnitChange().months(this.props["timeunitchangevalue"]);
                    break;
                case "Year":
                    mem.limit().timeUnitChange().years(this.props["timeunitchangevalue"]);
                    break;
            }
        }
        mem.onRetire(function (retired) {
            self.executeOutputLink("onRetire", retired);
        });
    }
    this.setOutputReference("Memory", execRef);

    function execRef() {
        return stream.memory(self.compid);
    }
}