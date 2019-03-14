function handler(In) {
    this.assertProperty(In, this.props["property"]);
    var mem = this.getInputReference("Memory")();
    if (mem.index(this.props["property"])=== null)
        mem.createIndex(this.props["property"]);
    mem.index(this.props["property"]).remove(In.property(this.props["property"]).value().toObject());
    mem.add(In);
    this.executeOutputLink("Out", In);
}