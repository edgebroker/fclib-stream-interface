function handler(In) {
    var self = this;
    var entries = [];
    stream.memory(this.compid).forEach(function (record) {
        var json = {};
        record.properties().forEach(function (prop) {
            json[prop.name()] = prop.value().toObject();
        });
        entries.push({key: self.keyOf(record), json: json});
    });
    entries.sort(function (a, b) {
        return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    });
    var out = stream.create().message().textMessage();
    out.body(JSON.stringify(entries.map(function (entry) {
        return entry.json;
    })));
    this.executeOutputLink("Listed", this.setReplyHeaders(out, In));
}
