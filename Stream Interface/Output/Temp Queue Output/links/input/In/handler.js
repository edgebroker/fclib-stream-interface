function handler(In) {
    stream.output(this.props["jndiname"]).send(In);
    this.executeOutputLink("Out", In);
}