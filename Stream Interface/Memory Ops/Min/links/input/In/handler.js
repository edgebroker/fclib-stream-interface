function handler(In) {
    if (!this.assertProperty(In, this.props["property"]))
        return;
    var self = this;
    var msg = In.min(this.props["property"]);
    if (msg !== null)
        self.executeOutputLink("Out", msg);
}