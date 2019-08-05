function handler(In) {
    var out = stream.create().message().textMessage();
    if (this.props["copy"] === true)
        out.copyProperties(In);

    var refMessage = this.getInputReference("Message");
    if (refMessage) {
        out.body(refMessage().body());
    }

    this.executeOutputLink("Out", out);
}