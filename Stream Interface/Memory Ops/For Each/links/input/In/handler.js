function handler(In) {
    var self = this;
    In.forEach(function (message) {
        self.executeOutputLink("Out", message);
    });
}