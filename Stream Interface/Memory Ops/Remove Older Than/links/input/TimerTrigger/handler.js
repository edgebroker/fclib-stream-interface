function handler(MessageTrigger) {
    var self = this;
    var mem = this.getInputReference("Memory")();
    this.executeOutputLink("Result", mem.removeOlderThan(time.currentTime()-getTime()));

    function getTime(){
        var t = self.props["milliseconds"];
        t += self.props["seconds"]*1000;
        t += self.props["minutes"]*1000*60;
        t += self.props["hours"]*1000*60*60;
        t += self.props["days"]*1000*60*60*24;
    }
}