function handler(message) {
    if (!this.assertProperty(message, this.props["groupproperty"]))
        return;
    stream.memoryGroup(this.compid).add(message);
    this.executeOutputLink("Out", message);
}