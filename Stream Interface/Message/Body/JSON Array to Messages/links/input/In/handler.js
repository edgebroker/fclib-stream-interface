function handler(In) {
    if (In.type() !== "text")
        throw "Input message is not a text message but: "+In.type();
    var body = In.body();
    var self = this;

    if (body) {
        var array = JSON.parse(body);
        if (!Array.isArray(array))
            throw "Body content is not an array!";
        array.forEach(function (item) {
            var resultMessage = stream.create().message().textMessage();

            if (typeof item === "object") {
                Object.keys(item).forEach(function (key) {
                    var propName = key.replace('-', '_').replace(/[!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/, '');
                    var value = item[key];

                    var shouldStringify = value && typeof value === "object";
                    if (shouldStringify) {
                        value = JSON.stringify(value);
                    }

                    resultMessage.property(propName).set(value);
                });
            } else {
                if (props["propname"]) {
                    resultMessage.property(props["propname"]).set(item);
                } else
                    throw "Property 'propname' must be set."
            }
            self.executeOutputLink("ForEach", resultMessage);
        });
    }
}
