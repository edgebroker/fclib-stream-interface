function handler(In) {
    this.assertProperty(In, this.props["queuenameprop"]);
    var queueName = this.props["queuenameprop"].value().toString();
    stream.create().output(queueName).queue();
    stream.output(queueName).send(In);
    stream.output(queueName).close();
    this.executeOutputLink("Out", In);
}