function handler(In) {

    var json = In.body();
    var replacefields = this.props["replacingkeys"];

    for(var i = 0; i < replacefields.length; i ++) {
        var str = JSON.stringify(json);
        str = str.replace(replacefields[i]["currentname"], replacefields[i]["newname"]);
        json = JSON.parse(str);
    }

    In.body().set(json);

    this.executeOutputLink("Out", In);
}