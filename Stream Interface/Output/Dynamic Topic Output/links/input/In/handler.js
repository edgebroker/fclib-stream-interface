function handler(In) {
    this.assertProperty(In, this.props["topicnameprop"]);
    var topicName = In.property(this.props["topicnameprop"]).value().toString();
    stream.create().output(topicName).topic();
    stream.output(topicName).send(In);
    stream.output(topicName).close();
    this.executeOutputLink("Out", In);
}