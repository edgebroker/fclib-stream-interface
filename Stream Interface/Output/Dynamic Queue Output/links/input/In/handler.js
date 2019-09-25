function handler(In) {
    this.assertProperty(In, this.props["queuenameprop"]);
    var queueName = In.property(this.props["queuenameprop"]).value().toString();
    if (stream.output(queueName) === null)
        stream.create().output(queueName).queue();
    stream.output(queueName).send(In);
    this.executeOutputLink("Out", In);
}