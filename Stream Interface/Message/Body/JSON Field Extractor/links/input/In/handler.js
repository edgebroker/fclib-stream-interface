function handler(In) {

    var fields = this.props["fields"];
    var self = this;
    var extracted = extractValues(In);
    for (var i = 0; i < extracted.max; i++) {
        var outMsg = stream.create().message().copyMessage(In);
        for (var j = 0; j < fields.length; j++) {
            var name = fields[j].name.value;            
            outMsg.property(name).set(extracted.values[j][i]);
        }    
        this.executeOutputLink("Out", outMsg);
    }

    function extractValues(msg) {
        var STRING = Java.type("java.lang.String");
        var values = [];
        var max = 0;
        try {
            switch (msg.type()) {
                case "bytes":
                    transform.setBody(new STRING(msg.body()), false);
                    break;
                case "text":
                    transform.setBody(msg.body(), false);
                    break;
                case "map":
                    transform.setBody(msg.body().toJson(), false);
                    break;
                default:
                    break;
            }
            for (var i = 0; i < fields.length; i++) {
                var path = fields[i].path.value;
                var result = transform.selectJSON(path);
                var val = [];
                for (var j = 0; j < result.size(); j++) {
                    val[j] = result.get(j);
                }
                values[i] = val;
                max = Math.max(max, result.size());
            }
            for (i = 0; i < values.length; i++)
                values[i] = fillWithLastValue(values[i], max);
        } catch (e) {
            self.flowcontext.sendError(self.compname, self.compid, e);
        }
        return {max: max, values: values};
    }

    function fillWithLastValue(inValue, max) {
        var result = inValue;
        var inLength = inValue.length;
        var lastValue = "undefined";
        if (inValue.length > 0)
            lastValue = inValue[inValue.length - 1];
        for (var i = inLength; i < max; i++)
            result.push(lastValue);
        return result;
    }
}