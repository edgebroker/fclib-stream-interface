function handler(In) {
    if (!this.assertProperty(In, this.props["keyproperty"]))
        return;
    var key = this.keyOf(In);
    var record = stream.create().message().copyMessage(In);
    record.property(this.props["keyproperty"]).set(key);
    if (this.persistent)
        record.persistent();
    var existing = this.lookup(key);
    if (existing !== null) {
        // Merge: keep existing properties that the upsert doesn't set
        existing.properties().forEach(function (prop) {
            if (!record.property(prop.name()).exists())
                record.property(prop.name()).set(prop.value().toObject());
        });
        this.removeRecord(existing);
    }
    stream.memory(this.compid).add(record);
    this.executeOutputLink("Changed", record);
}
