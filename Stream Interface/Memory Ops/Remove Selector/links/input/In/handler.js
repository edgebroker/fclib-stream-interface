function handler(In) {
    var mem = this.getInputReference("Memory")();
    var selector = subProps(In, this.props["selector"]);
    var result = mem.select(selector);
    mem.remove(selector);
    this.executeOutputLink("Result", result);

    function subProps(msg, value) {
        var result = value;
        msg.properties().forEach(function (p) {
            result = replaceAll(result, "\\{" + p.name() + "\\}", p.value().toString());
        });
        return result;
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
}