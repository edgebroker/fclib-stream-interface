function handler() {
    var self = this;

    this.send = function (inmsg) {
        var text = self.props["text"];
        if (inmsg) {
            if (inmsg.type() === "text")
                text = replaceAll(text, "{body}", inmsg.body());
            inmsg.properties().forEach(function (prop) {
                text = replaceAll(text, "\\{" + prop.name() + "\\}", prop.value().toObject());
            });
        }
        var msg = stream.create().message().textMessage()
            .property("name").set(self.props["monitor"])
            .body(JSON.stringify({
                name: self.props["monitor"],
                state: self.props["state"],
                time: time.currentTime(),
                message: text
            }));
        if (self.props["sendtoflow"] === true) {
            self.flowcontext.sendState(self.props["state"], text);
        }
        self.executeOutputLink("State", msg);
    };

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
}