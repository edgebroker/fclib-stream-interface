function handler() {
    this.keys = this.props["keys"];

    for (var i=0;i<this.keys.length;i++) {
        var type = this.keys[i]["type"];
        if (!(type === 'boolean' || type === 'string' || type === 'integer' || type === 'long' || type === 'double' || type === 'float'))
            throw "Invalid property type: " + type;
    }
    
}