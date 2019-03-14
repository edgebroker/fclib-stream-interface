function handler(In) {
    stream.output(this.props["topicname"]).send(In);
    this.executeOutputLink("Out", In);
}