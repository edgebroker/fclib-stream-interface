function handler(In) {
    var self = this;
    if (In.size() < this.props["position"]) {
        In.remove(this.props["position"]);
        self.executeOutputLink("Out", In);
    }
}