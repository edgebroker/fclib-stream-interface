function handler(In) {
    stream.output(this.props["queuename"]).send(In);
    this.executeOutputLink("Out", In);
}