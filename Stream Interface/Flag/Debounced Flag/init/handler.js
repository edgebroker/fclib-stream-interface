function handler() {
    var self = this;
    var MessageSelector = Java.type("com.swiftmq.ms.MessageSelector");
    this.ms = new MessageSelector(this.props["condition"]);
    this.ms.compile();

    // Counts below 1 make no sense; an unset/invalid value falls back to the descriptor default
    function count(value, def) {
        var n = parseInt(value, 10);
        return isNaN(n) ? def : Math.max(1, n);
    }

    this.raiseAfter = count(this.props["raiseafter"], 3);
    this.clearAfter = count(this.props["clearafter"], 1);

    // Persistent unless explicitly disabled (default is true)
    this.persistent = this.props["persistent"] !== false && this.props["persistent"] !== "false";
    if (this.persistent)
        stream.create().memory(this.compid).sharedQueue(this.flowcontext.getFlowQueue());
    else
        stream.create().memory(this.compid).heap();
    stream.memory(this.compid).createIndex("key");

    // State per key: one record with key, state ("RAISED"/"CLEARED") and count, the
    // number of consecutive messages counting towards the opposite state. A cleared key
    // with count 0 has no record, so the memory only holds keys that carry state.
    this.getState = function (key) {
        var result = stream.memory(self.compid).index("key").get(key);
        if (result.size() === 0)
            return {raised: false, count: 0};
        var record = result.first();
        return {
            raised: record.property("state").value().toString() === "RAISED",
            count: record.property("count").value().toInteger()
        };
    };

    this.setState = function (key, state) {
        var mem = stream.memory(self.compid);
        if (mem.index("key").get(key).size() > 0)
            mem.index("key").remove(key);
        if (!state.raised && state.count === 0)
            return;
        var record = stream.create().message().message();
        record.property("key").set(key);
        record.property("state").set(state.raised ? "RAISED" : "CLEARED");
        record.property("count").set(typeconvert.toInteger(state.count));
        if (self.persistent)
            record.persistent();
        mem.add(record);
    };

    this.reject = function (In, property) {
        var outMsg = stream.create().message().copyMessage(In);
        outMsg.property("error").set("Missing property '" + property + "'");
        self.executeOutputLink("Rejected", outMsg);
    };

    this.emit = function (In, link, key, state, count) {
        var outMsg = stream.create().message().copyMessage(In);
        outMsg.property("state").set(state);
        outMsg.property("count").set(typeconvert.toInteger(count));
        outMsg.property("key").set(key);
        self.executeOutputLink(link, outMsg);
    };
}
