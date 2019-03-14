function handler(In) {
    try {
        var STRING = Java.type("java.lang.String");
        var JSON;
        var outMsg = stream.create().message().copyMessage(In);
        outMsg.clearBody();
        switch (In.type()) {
            case "bytes":
                JSON = new STRING(transform.XMLtoJSON(new STRING(In.body()), true)).getBytes();
                break;
            case "text":
                JSON = transform.XMLtoJSON(In.body(), true);
                break;
            default:
                throw "Invalid message type:" + In.type();
        }
        outMsg.body(JSON);
        this.executeOutputLink("Out", outMsg);
    } catch (e) {
        stream.log().error(this.compname + " (" + this.compid + "): " + e);
    }
}