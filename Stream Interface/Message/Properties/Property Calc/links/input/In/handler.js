function handler(In) {
    this.assertProperty(In, this.props["inproperty"]);
    In.property(this.props["outproperty"]).set(operation(In.property(this.props["inproperty"]).value().toObject(), this.getInputReference("Property")().value().toObject()));
    this.executeOutputLink("Out", In);

    function operation(MessageProp, RefProp) {
        /*${operation}*/
    }
}