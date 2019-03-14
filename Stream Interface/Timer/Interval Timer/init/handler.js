function handler() {
    var self = this;
    stream.create().timer(this.compid).interval()
        .milliseconds(this.props["milliseconds"])
        .seconds(this.props["seconds"])
        .minutes(this.props["minutes"])
        .hours(this.props["hours"])
        .days(this.props["days"])
        .onTimer(function (timer) {
            self.executeOutputLink("onTimer", timer);
        })
}