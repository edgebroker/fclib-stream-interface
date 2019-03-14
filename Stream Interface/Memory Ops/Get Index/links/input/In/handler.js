function handler(In) {
    this.assertProperty(In, this.props["property"]);
    var mem = this.getInputReference("Memory")();
    if (mem.index(this.props["index"])=== null)
        mem.createIndex(this.props["index"]);
    this.executeOutputLink("Result", mem.index(this.props["property"]).get(In.property(this.props["property"]).value().toObject()));
}