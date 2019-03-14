function handler(In) {
    var self = this;
    In.forEach(function (property) {
        self.executeOutputLink("Out", property);
    });
}