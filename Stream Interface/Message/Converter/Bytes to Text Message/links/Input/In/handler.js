function handler(In) {
    if (In.type() !== "bytes")
        throw "Input message is not a bytes message but: "+In.type();
    var out = stream.create().message().textMessage();
    out.copyProperties(In);
    var STRING = Java.type("java.lang.String");
    out.body(new STRING(In.body()));
    this.executeOutputLink("Out", out);
}