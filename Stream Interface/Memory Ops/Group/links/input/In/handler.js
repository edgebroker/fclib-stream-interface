function handler(In) {
    var self = this;
    if (In.size() > 0)
        self.executeOutputLink("Out", In.group(this.props["property"]));
}