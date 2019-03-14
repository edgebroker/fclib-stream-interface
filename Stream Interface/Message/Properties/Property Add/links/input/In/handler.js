function handler(In) {
    var prop = this.getInputReference("Property")();
    if (this.props["property"])
        In.property(this.props["property"]).set(prop.value().toObject());
    else
        In.property(prop.name()).set(prop.value().toObject());
    this.executeOutputLink("Out", In);
}