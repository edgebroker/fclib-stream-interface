function handler(In) {
    if (!this.assertProperty(In, this.props["keyproperty"]))
        return;
    var record = this.lookup(this.keyOf(In));
    if (record !== null)
        this.removeRecord(record);
    this.executeOutputLink("Changed", In);
}
