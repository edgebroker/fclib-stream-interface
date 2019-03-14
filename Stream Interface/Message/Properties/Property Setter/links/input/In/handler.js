function handler(In) {
    var self = this;
    if (!this.refset) {
        if (this.getInputReference("PropertySet"))
            this.refset = this.getInputReference("PropertySet")();
    }
    var outMsg = stream.create().message().copyMessage(In);

    for (var i=0;i<this.properties.length;i++){
        if (this.values[i] === '[null]')
            outMsg.property(this.properties[i]).set(null);
        else
            outMsg.property(this.properties[i]).set(convert(subSystemTags(subRefProps(this.values[i])), this.types[i]));
    }

    this.executeOutputLink("Out", outMsg);

    function subSystemTags(value){
        var result = value;
        if (result.indexOf("[time]") !== -1)
            result = replaceAll(result, "\\[time\\]", time.currentTime()+"");
        return result;
    }

    function subRefProps(value){
        if (!self.refset)
            return value;
        var result = value;
        self.refset.forEach(function(p){
            result = replaceAll(result, "\\{"+p.name()+"\\}", p.value().toString());
        });
        return result;
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    function convert(value, type){
        var result;
        switch (type){
            case 'boolean':
                result = new self.BOOLEAN(value);
                break;
            case 'string':
                result = value;
                break;
            case 'integer':
                result = new self.INTEGER(value);
                break;
            case 'long':
                result = new self.LONG(value);
                break;
            case 'double':
                result = new self.DOUBLE(value);
                break;
            case 'float':
                result = new self.FLOAT(value);
                break;
        }
        return result;
    }
}