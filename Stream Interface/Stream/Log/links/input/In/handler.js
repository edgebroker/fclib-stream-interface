function handler(In) {
    var s = "Component: " + this.compname + ", Id: " + this.compid + "\n";
    s += "Message Type: " + In.type() + "\n";
    s += "Properties:\n";
    In.properties().forEach(function (prop) {
        s += "    " + prop.name() + "=" + prop.value().toObject() + "\n";
    });
    s += "Message Body:\n";
    switch (In.type()) {
        case "bytes":
            var STRING = Java.type("java.lang.String");
            s += "    " + new STRING(In.body());
            break;
        case "text":
            s += "    " + In.body();
            break;
        case "map":
            s += "    " + In.body().toJson();
            break;
        case "stream":
            s += "   *** unable to convert message body ***";
            break;
        case "object":
            s += "   *** unable to convert message body ***";
            break;
        case "message":
            s += "   *** this message has no body ***";
            break;
    }
    s += "\n";
    stream.log().info(s);
    this.executeOutputLink("Out", In);
}