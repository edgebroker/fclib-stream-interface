function handler(In) {
    if (In.type() !== "map")
        throw "Input message is not a map message but: "+In.type();
    var out = stream.create().message().textMessage();
    out.copyProperties(In);
    out.body(In.body().toJson());
    this.executeOutputLink("Out", out);
}