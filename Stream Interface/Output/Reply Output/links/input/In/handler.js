function handler(In) {
    var outMsg = stream.create().message().copyMessage(In);
    outMsg.getImpl().clearSwiftMQAllProps();
    stream.create().output(null).forAddress(outMsg.replyTo()).send(outMsg).close();
    this.executeOutputLink("Out", outMsg);
}