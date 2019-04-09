function handler(In) {
    var json = convertMessageToJson(In);
    stream.log.info(JSON.stringify(json));
    this.executeOutputLink("Out", json);

    function convertMessageToJson(In) {
        var result = {};

        In.properties.forEach(function(prop) {
            var propName = prop.name();
            var value = props.value.toObject();
            result[propName]  = value;
        });

        return result;
    }

}