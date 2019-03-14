function handler(In) {
    this.assertProperty(In, this.props["property"]);
    var self = this;
    if (exists(In))
        this.executeOutputLink("Exists", In);
    else
        this.executeOutputLink("Not Exists", In);

    function exists(In) {
        var mem = self.getInputReference("Memory")();
        if (mem.index(self.props["index"])=== null)
            mem.createIndex(self.props["index"]);
         return mem.index(self.props["index"]).get(In.property(self.props["property"]).value().toObject()).size() > 0;
    }
}