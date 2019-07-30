function handler(In) {
    var self = this;
    var cnt = In.property(this.props["property"]).value().toInteger();
    for(var i = 0; i < cnt; i++){
        self.executeOutputLink("Out", In);
    }
}