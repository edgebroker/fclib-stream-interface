function handler(In) {
    var self = this;
    var msg = stream.create().message().message();
    msg.property("average").set(In.average(this.props["property"]));
    self.executeOutputLink("Out", msg.property("average"));
}