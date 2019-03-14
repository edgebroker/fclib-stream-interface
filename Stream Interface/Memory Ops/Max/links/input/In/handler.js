function handler(In) {
    if (!this.assertProperty(In, this.props["property"]))
        return;
    var self = this;
    var msg = In.max(this.props["property"]);
    if (msg !== null)
        self.executeOutputLink("Out", msg);
}