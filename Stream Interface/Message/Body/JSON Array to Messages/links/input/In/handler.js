function handler(In) {
    var body = In.body();
    var self = this;

    if (body) {
        try {
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

        } catch (error) {
            stream.log().error(error);
        }
    }
}