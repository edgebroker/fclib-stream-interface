function handler(In) {

    var outMsg = stream.create().message().message();
    stream.log().info(JSON.stringify(this.getInputReference("Message")));
    var source = this.getInputReference("Message")();
    for(var key in source) {
        outMsg.property(key).set(source[key]);
    }

    this.executeOutputLink("Out", outMsg);

    outMsg.properties().forEach(function (prop) {
        stream.log().info(prop.name() + ": " + prop.value().toObject());
    });
}