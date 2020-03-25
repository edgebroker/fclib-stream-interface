function handler(In) {

    var self = this;

    if (this.getInputReference("Message"))
        this.refset = this.getInputReference("Message")();
    var outMsg = In;

    for (var i = 0; i < this.properties.length; i++) {
        
        var name = this.properties[i]["name"];
        var type = this.properties[i]["type"];
        var value = this.properties[i]["value"];

        if (value === '[null]')
            outMsg.property(name).set(null);
        else
            outMsg.property(name).set(convert(subSystemTags(subRefProps(value)), type));
    }

    this.executeOutputLink("Out", outMsg);

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
        if (!self.refset)
            return value;
        var result = value;
        self.refset.properties().forEach(function (p) {
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