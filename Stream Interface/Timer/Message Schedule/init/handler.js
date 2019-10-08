function handler() {
    var self = this;
    stream.create().output(this.props["schedulerqueue"]).queue();

    this.schedule = function (message) {
        var outMsg = stream.create().message().copyMessage(message);
        outMsg.property("streams_scheduler_delay").set(time.format(time.currentTime() + delay(), "dd.MM.yyyy HH:mm:ss"))
            .property("streams_scheduler_destination").set(self.props["destination"])
            .property("streams_scheduler_destination_type").set(self.props["destinationtype"]);
        stream.output(self.props["schedulerqueue"]).send(outMsg);
    };

    function delay() {
        var delay = self.props["delay"];
        var result = 0;
        switch (self.props["timeunit"]) {
            case "Seconds":
                result = delay * 1000;
                break;
            case "Minutes":
                result = delay * 60 * 1000;
                break;
            case "Hours":
                result = delay * 60 * 60 * 1000;
                break;
            case "Days":
                result = delay * 24 * 60 * 60 * 1000;
                break;
            case "Months":
                result = delay * 30 * 24 * 60 * 60 * 1000;
                break;
        }
        return result;
    }

}