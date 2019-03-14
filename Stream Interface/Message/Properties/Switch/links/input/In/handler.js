function handler(In) {
    if (!this.assertProperty(In, this.props["property"]))
        return;
    for (var i = 0; i < this.props["values"].length; i++) {
        if (this.props["values"][i] === In.property(this.props["property"]).value().toObject())
            this.executeOutputLink(this.props["values"][i], In);
    }
}