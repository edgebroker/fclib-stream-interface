function handler(In) {
    var self = this;
    var mem = this.getInputReference("Memory")();
    var selector = subProps(In, this.props["selector"]);
    self.executeOutputLink("Result", mem.select(selector));

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