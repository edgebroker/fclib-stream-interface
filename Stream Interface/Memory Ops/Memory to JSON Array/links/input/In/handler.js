function handler(In) {

    var body = "[";

    In.forEach(function (message, messageIndex) {

        var obj = "{";

        message.properties().forEach(function (property, index) {

            var STRING = Java.type("java.lang.String");
            var name = property.name();
            var value = property.value().toObject();

            if (value instanceof STRING) {
                value = '\\"' + value + '\\"';
            }

            obj += '\\"' + name + '\\": ' + value + ",";

        });

        obj = obj.substring(0, obj.length - 1);

        obj += "}";

        body += obj + ",";

    });

    var hasValues = In.size() > 0;
    if (hasValues) {
        body = body.substring(0, body.length - 1);
    }

    body += "]";

    var out = stream.create().message().textMessage();

    out.body(body);

    this.executeOutputLink("Out", out) ;


}