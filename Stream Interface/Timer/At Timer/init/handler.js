function handler() {
    var self = this;
    stream.create().timer(this.compid).at();
    var timer = stream.timer(this.compid);
    for (var i = 0; i < this.props["times"].length; i++)
        timer.time(this.props["times"][i]);
    timer.onTimer(function (timer) {
        self.executeOutputLink("onTimer", timer);
    })
}