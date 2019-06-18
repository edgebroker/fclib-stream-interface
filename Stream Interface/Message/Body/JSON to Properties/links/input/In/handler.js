function handler(In) {

    var properties = this.props["properties"];
    var source = this.getInputReference("JSON")();

    properties.forEach(function(property) {
    	var name = property["name"];
    	var field = property["field"];
    	In.property(name).set(source[field]);
    });

    this.executeOutputLink("Out", In);
}