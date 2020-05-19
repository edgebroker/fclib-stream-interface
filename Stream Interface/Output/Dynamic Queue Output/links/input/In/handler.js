function handler(In) {
    this.assertProperty(In, this.props["queuenameprop"]);
    var queueName = In.property(this.props["queuenameprop"]).value().toString();
    this.createIfNecessary(queueName);
    if (stream.output(queueName) === null)
        stream.create().output(queueName).queue();
    if (this.props["persistent"])
        In.persistent();
    else
        In.nonpersistent();
    stream.output(queueName).send(In);
    this.executeOutputLink("Out", In);
}