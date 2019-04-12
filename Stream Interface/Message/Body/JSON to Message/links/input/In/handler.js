function handler(In) {

    var outMsg = stream.create().message().message();
    var source = this.getInputReference("Message")();
    for (var key in source) {
        outMsg.property(key).set(source[key]);
    }
    
    this.executeOutputLink("Out", outMsg);
}