function handler(In) {

    var fields = this.props["fields"];
    var properties = this.props["properties"];

    this.json = JsonFromMessage(In);

    this.executeOutputLink("Out", this.json);

    function JsonFromMessage(In) {
        var result = {};

        for(var i = 0; i < fields.length; i ++) {
            var field = fields[i];
            var name = properties[i];
            result[field] = In.property(name).value().toObject();
        }

        return result;
    }

}