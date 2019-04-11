function handler(In) {

    var outMsg = stream.create().message().message();
    var source = this.getInputReference("Message")();
    for (var key in source) {
        outMsg.property(key).set(source[key]);
    }

    outMsg.properties().forEach(function (prop) {
        stream.log().info(prop.name() + ": " + prop.value().toObject());
    });

    this.executeOutputLink("Out", outMsg);
}