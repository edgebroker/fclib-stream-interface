function handler(In) {
    var out = stream.create().message().mapMessage();
    if (this.props["copy"] === true)
        out.copyProperties(In);
    this.executeOutputLink("Out", out);
}