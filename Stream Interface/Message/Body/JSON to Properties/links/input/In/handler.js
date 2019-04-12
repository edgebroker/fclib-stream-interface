function handler(In) {

    var fields = this.props["fields"];
    var properties = this.props["properties"];

    var source = this.getInputReference("Message")();

    fields.forEach(function(field, index) {
        var name = properties[index];
        In.property(name).set(source[field]);
    });

    this.executeOutputLink("Out", In);
}