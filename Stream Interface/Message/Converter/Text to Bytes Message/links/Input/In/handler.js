function handler(In) {
    if (In.type() !== "text")
        throw "Input message is not a text message but: "+In.type();
    var out = stream.create().message().bytesMessage();
    out.copyProperties(In);
    out.body(In.body().getBytes());
    this.executeOutputLink("Out", out);
}