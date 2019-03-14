function handler(In) {
    var self = this;
    var mem = this.getInputReference("Memory")();
    mem.forEach(function (message) {
        self.executeOutputLink("Out", message);
    });
}