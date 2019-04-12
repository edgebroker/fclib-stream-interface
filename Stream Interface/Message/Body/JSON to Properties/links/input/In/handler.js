function handler(In) {

    var fields = this.props["fields"];
    var properties = this.props["properties"];

    var outMsg = stream.create().message().message();
    var source = this.getInputReference("Message")();

    fields.forEach(function(field, index) {
        var name = properties[index];
        outMsg.property(name).set(source[field]);
    });

    this.executeOutputLink("Out", outMsg);
}