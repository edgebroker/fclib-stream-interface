function handler(In) {
    if (!this.assertProperty(In, this.props["keyproperty"]))
        return;
    var key = this.keyOf(In);
    var record = this.lookup(key);
    if (record !== null) {
        this.executeOutputLink("Found", this.setReplyHeaders(stream.create().message().copyMessage(record), In));
    } else {
        var outMsg = stream.create().message().copyMessage(In);
        outMsg.property("error").set("Unknown key '" + key + "'");
        this.executeOutputLink("NotFound", outMsg);
    }
}
