function handler(In) {
    var self = this;
    self.executeOutputLink("Out", In.sum(this.props["property"]));
}