function handler(In) {
    this.assertProperty(In, this.props["topicnameprop"]);
    var topicName = In.property(this.props["topicnameprop"]).value().toString();
    if (stream.output(topicName) === null)
        stream.create().output(topicName).topic();
    stream.output(topicName).send(In);
    this.executeOutputLink("Out", In);
}