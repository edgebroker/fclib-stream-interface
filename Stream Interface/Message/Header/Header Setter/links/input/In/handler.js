function handler(In) {
    var ref = this.getInputReference("Message")();
    if (this.props["copyReplyTo"])
        In.replyTo(ref.replyTo());
    if (this.props["copyCorrelationId"])
        In.correlationId(ref.correlationId());
    this.executeOutputLink("Out", In);
}