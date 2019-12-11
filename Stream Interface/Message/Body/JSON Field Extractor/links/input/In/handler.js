function handler(In) {

    var fields = this.props["fields"];

    var resultMsg = stream.create().message().copyMessage(In);

    for (var i = 0; i < fields.length; i++) {
        var name = fields[i].name;
        var path = fields[i].path;
        var value = valueAt(path);
        if (notEmpty(value)) {
            resultMsg.property(name).set(value);
        }
    }

    this.executeOutputLink("Out", resultMsg);

    function valueAt(path) {
        var pathArray = path.split(".");
        var incomingMessageValue = bodyAsStringFrom(In);

        try {
            var jsonMessage = JSON.parse(incomingMessageValue);
        } catch (e) {
            return null;
        }

        var value = pathArray.reduce(function (acc, i, index) {
            var isStartPlaceholder = index === 0 && i === "$";
            if (isStartPlaceholder) {
                return acc;
            }
            if (acc) {
                return acc[i];
            }
        }, jsonMessage);

        var shouldStringify = value && typeof value === "object";
        if (shouldStringify) {
            value = JSON.stringify(value);
        }

        return value;
    }

    function bodyAsStringFrom(message) {
        var String = Java.type("java.lang.String");
        switch (message.type()) {
            case "bytes":
                return new String(message.body());
            case "text":
                return message.body();
            case "map":
                return JSON.stringify(message.body().toJson());
            default:
                return "{}";
        }
    }

    function notEmpty(value) {
        return value !== undefined && value !== null;
    }
}
