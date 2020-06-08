function handler(In) {

    if (In.type() !== "text") {
        throw "Incoming message is not a text message";
    }
    var json = {};

    try {
        json = JSON.parse(In.body());
    } catch (e) {
    }

    for (var i = 0; i < this.props["fields"].length; i++) {
        var name = this.props["fields"][i]["name"];
        var type = this.props["fields"][i]["type"];
        var value = this.props["fields"][i]["value"];
        if (value === "[null]")
            delete json[name];
        else
            json[name] = convert(subSystemTags(subRefProps(value)), type);
    }

    In.body(JSON.stringify(json));
    this.executeOutputLink("Out", In);

    function subSystemTags(value) {
        var result = value;
        if (result.indexOf("[time]") !== -1)
            result = replaceAll(result, "\\[time\\]", time.currentTime() + "");
        else
        if (result.indexOf("[routername]") !== -1)
            result = replaceAll(result, "\\[routername\\]", stream.routerName());
        else
        if (result.indexOf("[appname]") !== -1)
            result = replaceAll(result, "\\[appname\\]", stream.domainName());
        else
        if (result.indexOf("[flowname]") !== -1)
            result = replaceAll(result, "\\[flowname\\]", stream.name());
        return result;
    }

    function subRefProps(value) {
        var result = value;
        In.properties().forEach(function (p) {
            result = replaceAll(result, "\\{" + p.name() + "\\}", p.value().toString());
        });
        return result;
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    function convert(value, type) {
        var result;
        switch (type) {
            case 'boolean':
                result = typeconvert.toBoolean(value);
                break;
            case 'string':
                result = value;
                break;
            case 'integer':
                result = typeconvert.toInteger(value);
                break;
            case 'long':
                result = typeconvert.toLong(value);
                break;
            case 'double':
                result = typeconvert.toDouble(value);
                break;
            case 'float':
                result = typeconvert.toFloat(value);
                break;
        }
        return result;
    }
}