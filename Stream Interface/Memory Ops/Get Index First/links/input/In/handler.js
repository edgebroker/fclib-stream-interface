function handler(In) {
    this.assertProperty(In, this.props["property"]);
    var mem = this.getInputReference("Memory")();
    if (mem.index(this.props["index"])=== null)
        mem.createIndex(this.props["index"]);
    var result = mem.index(this.props["index"]).get(In.property(this.props["property"]).value().toObject());
    if (result.size() > 0)
        this.executeOutputLink("Result", result.first());
}