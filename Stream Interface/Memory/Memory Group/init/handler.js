function handler() {
    var self = this;
    if (this.props["inactivitytimeout"] === true)
        stream.create().memoryGroup(this.compid, this.props["groupproperty"])
            .inactivityTimeout()
            .days(this.props["inactivitydays"])
            .hours(this.props["inactivityhours"])
            .minutes(this.props["inactivityminutes"])
            .seconds(this.props["inactivityseconds"])
            .milliseconds(this.props["inactivitymilliseconds"]);
    else
        stream.create().memoryGroup(this.compid, this.props["groupproperty"]);
    stream.memoryGroup(this.compid).onCreate(function(key){
       return self.getInputReference("MemoryFactory")(key+"_"+self.compid);
    });
    this.setOutputReference("MemoryGroup", execRef);
    function execRef() {
        return stream.memoryGroup(self.compid);
    }
}