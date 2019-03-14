function handler(In) {
    var self = this;
    In.forEach(function (memory) {
        self.executeOutputLink("Out", memory);
    });
}