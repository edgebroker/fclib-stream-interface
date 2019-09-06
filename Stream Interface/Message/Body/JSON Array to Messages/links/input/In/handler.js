function handler(In) {
    if (In.type() !== "text")
        throw "Input message is not a text message but: "+In.type();
    var body = In.body();
    var self = this;

    if (body) {
        var array = JSON.parse(body);
        array.forEach(function (item) {
            var resultMessage = stream.create().message().textMessage();

            Object.keys(item).forEach(function (key) {
                var propName = key.replace('-', '_').replace(/[!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/, '')
                var value = item[key];
                resultMessage.property(propName).set(value);
            });

            self.executeOutputLink("ForEach", resultMessage);
        });
    }
}