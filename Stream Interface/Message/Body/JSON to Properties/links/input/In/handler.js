function handler(In) {

    var fields = this.props["fields"];
    var properties = this.props["properties"];

    var source = this.getInputReference("JSON")();

    for(var i = 0; i < fields.length; i++){
        var name = properties[i];
        In.property(name).set(source[fields][i]);
    }

    this.executeOutputLink("Out", In);
}