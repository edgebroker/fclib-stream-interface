function handler() {
    var self = this;
    var keyproperty = this.props["keyproperty"];
    var ignoreCase = this.props["keycase"] === "ignore";

    // Persistent unless explicitly disabled (default is true)
    this.persistent = this.props["persistent"] !== false;
    if (this.persistent)
        stream.create().memory(this.compid).sharedQueue(this.flowcontext.getFlowQueue());
    else
        stream.create().memory(this.compid).heap();
    stream.memory(this.compid).createIndex(keyproperty);

    // Keys are handled as strings so lookups don't depend on the key property's type
    this.keyOf = function (message) {
        return message.property(keyproperty).value().toString();
    };

    // Returns the stored record for the key or null
    this.lookup = function (key) {
        var mem = stream.memory(self.compid);
        if (!ignoreCase) {
            var result = mem.index(keyproperty).get(key);
            return result.size() > 0 ? result.first() : null;
        }
        // The index is case sensitive, so case insensitive lookups scan the records
        var lowerKey = key.toLowerCase();
        var found = null;
        mem.forEach(function (record) {
            if (found === null && self.keyOf(record).toLowerCase() === lowerKey)
                found = record;
        });
        return found;
    };

    this.removeRecord = function (record) {
        stream.memory(self.compid).index(keyproperty).remove(self.keyOf(record));
    };

    this.setReplyHeaders = function (out, request) {
        out.replyTo(request.replyTo());
        out.correlationId(request.correlationId());
        return out;
    };

    this.setOutputReference("Memory", execRef);

    function execRef() {
        return stream.memory(self.compid);
    }
}
