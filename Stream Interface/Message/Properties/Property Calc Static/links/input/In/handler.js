function handler(In) {
    In.property(this.props["outproperty"]).set(operation());
    this.executeOutputLink("Out", In);

    function operation() {
        /*${operation}*/
    }
}