function handler(In) {

    var refMessage = this.getInputReference("Message")();
    var outMsg = stream.create().message().copyMessage(In);

    refMessage.properties().forEach(function (refProp) {
        outMsg.property(refProp.name()).set(refProp.value().toString());
    });

    this.executeOutputLink("Out", outMsg);
}