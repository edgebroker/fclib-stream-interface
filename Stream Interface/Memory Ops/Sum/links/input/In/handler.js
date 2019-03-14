function handler(In) {
    var self = this;
    var msg = stream.create().message().message();
    msg.property("sum").set(In.sum(this.props["property"]));
    self.executeOutputLink("Out", msg.property("sum"));
}