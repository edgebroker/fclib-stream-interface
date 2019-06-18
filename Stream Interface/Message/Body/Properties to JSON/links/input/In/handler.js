function handler(In) {

    var properties = this.props["properties"];
    this.json = JsonFromMessage(In);
    this.executeOutputLink("Out", this.json);

    function JsonFromMessage(In) {
        var result = {};
        for(var i = 0; i < properties.length; i ++) {
            var key = properties[i]["key"];
            var name = properties[i]["name"];
            result[key] = In.property(name).value().toObject();
        }
        return result;
    }

}