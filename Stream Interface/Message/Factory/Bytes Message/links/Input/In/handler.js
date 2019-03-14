function handler(In) {
    var out = stream.create().message().bytesMessage();
    if (this.props["copy"] === true)
        out.copyProperties(In);
    this.executeOutputLink("Out", out);
}