function handler(In) {
    this.json = JsonFromMessage(In);

    this.executeOutputLink("Out", this.json);

    function JsonFromMessage(In) {
        var result = {};
        In.properties().forEach(function (prop) {
            var propName = prop.name();
            var value = prop.value().toObject();
            result[propName] = value;
        });
        return result;
    }

}