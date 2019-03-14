function handler(In) {
    var self = this;
    if (this.sequencevalue === Number.MAX_VALUE)
        this.sequencevalue = this.INTEGER.parseInt(this.props["initvalue"]);
    In.property(this.props["property"]).set(this.INTEGER.parseInt(this.sequencevalue));
    this.sequencevalue++;
    this.executeOutputLink("Out", In);
}