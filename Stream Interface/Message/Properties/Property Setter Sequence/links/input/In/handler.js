function handler(In) {
    var self = this;
    if (this.sequencevalue === Number.MAX_VALUE)
        this.sequencevalue = typeconvert.toInteger(this.props["initvalue"]);
    In.property(this.props["property"]).set(this.sequencevalue);
    this.sequencevalue++;
    this.executeOutputLink("Out", In);
}