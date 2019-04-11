function handler(source) {

    var path = this.props["path"];  //$.some.path
    var pathsArray = path.split(".");
    pathsArray.shift(); // Remove beginning '$'

    var value = source;
    var missingProp = false;

    for(var i = 0; i < pathsArray.length; i ++) {
        if(!missingProp) {
            try {
                value = value[pathsArray[i]];
            } catch (err) {
                missingProp = true
            }
        }
    }

    if (missingProp) {
        stream.log().info("Missing Property at path: " + path);
        stream.log().info(JSON.stringify(source));
        this.executeOutputLink("Error", source);
    } else {
        stream.log().info("Extracted Property");
        stream.log().info(JSON.stringify(value));
        this.executeOutputLink("Success", value);
    }

}