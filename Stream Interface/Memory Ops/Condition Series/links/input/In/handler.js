function handler(In) {
    var self = this;
    if (this.assertProperty(In, this.props["property"]))
        if (condition(In))
            this.executeOutputLink("Match", In);
        else
            this.executeOutputLink("No Match", In);

    function condition(mem) {
        if (self.props["type"] === "Ascending Series")
            return mem.ascendingSeries(self.props["property"]);
        return mem.descendingSeries(self.props["property"]);
    }
}