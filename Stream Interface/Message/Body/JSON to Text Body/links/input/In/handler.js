function handler(In) {
    this.body = JSON.stringify(In);
    var outMsg = stream.create().message().textMessage();
    outMsg.body(this.body);
    this.executeOutputLink("Out", outMsg);
}