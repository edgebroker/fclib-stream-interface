function handler(In) {
    var out = stream.create().message().textMessage();
    if (this.props["copy"] === true)
        out.copyProperties(In);
    this.executeOutputLink("Out", out);
}