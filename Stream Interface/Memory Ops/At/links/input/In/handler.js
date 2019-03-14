function handler(In) {
    var self = this;
    if (In.size() < this.props["position"])
        self.executeOutputLink("Out", In.at(this.props["position"]));
}