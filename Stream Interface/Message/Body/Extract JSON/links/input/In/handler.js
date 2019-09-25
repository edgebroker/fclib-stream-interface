function handler(source) {
    var path = this.props["path"];  //$.some.path
    var pathsArray = path.split(".");

    var value = pathsArray.reduce(function (acc, i, index) {
        var isStartPlaceholder = index === 0 && i === "$";
        if (isStartPlaceholder) {
            return acc;
        }
        if (acc) {
            return acc[i];
        }
    }, source);

    if (value === undefined) {
        this.executeOutputLink("Error", source);
    } else {
        this.executeOutputLink("Success", value);
    }
}
