function handler(In) {
    var self = this;
    for (var i=0;i<this.props["iterations"];i++) {
        self.executeOutputLink("Out", In);
    };
}