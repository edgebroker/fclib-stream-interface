function handler(In) {
    var self = this;
    self.executeOutputLink("Result", In.select(this.props["selector"]));
}