function handler(In) {
    var self = this;
    this.message = In;
    self.executeOutputLink("Out", In);
}