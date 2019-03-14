function handler(In) {
    var self = this;
    var mem = In.sort(this.props["property"]);
    if (this.props["order"] === "Descending")
        mem.reverse();
    self.executeOutputLink("Out", mem);
}