function handler(In) {
    this.assertProperty(In, this.props["property"]);
    this.property = In.property(this.props["property"]);
    this.executeOutputLink("Out", In);
}