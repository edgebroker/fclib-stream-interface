function handler(In) {
    var out = stream.create().message().message();
    if (this.props["copy"] === true)
        out.copyProperties(In);
    this.executeOutputLink("Out", out);
}