function handler(In) {
    var self = this;
    self.executeOutputLink("Out", In.min(this.props["property"]));
}