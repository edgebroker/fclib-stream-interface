function handler() {
    var self = this;
    stream.create().timer(this.compid).next();
    var timer = stream.timer(this.compid);
    switch (this.props["beginof"]) {
        case "Second":
            timer.beginOfSecond();
            break;
        case "Minute":
            timer.beginOfMinute();
            break;
        case "Hour":
            timer.beginOfHour();
            break;
        case "Day":
            timer.beginOfDay();
            break;
    }
    timer.onTimer(function (timer) {
        self.executeOutputLink("onTimer", timer);
    })
}