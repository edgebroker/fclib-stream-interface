function handler(In) {
    var self = this;
    self.executeOutputLink("Out", In.average(this.props["property"]));
}