function handler(In) {
    var self = this;

    if (In.type() !== "text")
        throw "Incoming message is not a text message";
    var body = this.substitute(this.props["body"]);

    In.properties().forEach(function(prop){
        body = replaceAll(body, "\\{"+prop.name()+"\\}", prop.value().toString());
    });
    In.body(body);

    this.executeOutputLink("Out", In) ;

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
}