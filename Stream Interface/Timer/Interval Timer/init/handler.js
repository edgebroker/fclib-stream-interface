function handler() {
    var self = this;
    
    if (this.props["milliseconds"] === 0 &&
        this.props["seconds"] === 0 &&
        this.props["minutes"] === 0 &&
        this.props["hours"] === 0 &&
        this.props["days"] === 0)
        throw "At least one timer property value must be > 0!";

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