function handler(In) {
    if (this.props["persistent"])
        In.persistent();
    else
        In.nonpersistent();
    stream.output(this.props["queuename"]).send(In);
    this.executeOutputLink("Out", In);
}