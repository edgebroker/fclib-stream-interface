function handler(In) {

    var self = this;
    var keys = this.props["keys"];

    if (In.type() !== "map")
        throw "Incoming message is not a map message";

    for (var i=0;i<this.keys.length;i++){
        var name = this.keys[i]["name"];
        var value = this.keys[i]["value"];
        var type = this.keys[i]["type"];
        In.body().set(name, convert(subSystemTags(props(In, this.substitute(value))), type));
    }    

    this.executeOutputLink("Out", In);

    function subSystemTags(value){
        var result = value;
        if (result.indexOf("[time]") !== -1)
            result = replaceAll(result, "\\[time\\]", time.currentTime()+"");
        return result;
    }

    function props(msg, value){
        var result = value;
        msg.properties().forEach(function(p){
            result = replaceAll(result, "\\{"+p.name()+"\\}", p.value().toString());
        });
        return result;
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    function convert(value, type){
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