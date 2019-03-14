function handler(In) {
    this.assertProperty(In, this.props["property"]);
    var mem = this.getInputReference("Memory")();
    if (mem.index(this.props["index"])=== null)
        mem.createIndex(this.props["index"]);
    mem.index(this.props["index"]).remove(In.property(this.props["property"]).value().toObject());
    this.executeOutputLink("Out", In);
}