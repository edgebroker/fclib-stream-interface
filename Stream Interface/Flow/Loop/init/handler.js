function handler() {
    var self = this;
    this.async = this.props["async"];
    this.staticdef = this.props["static"];
    if (this.staticdef) {
        if (!this.props["iterations"])
            throw "Missing number of iterations for static loop!";
        this.iterations = this.props["iterations"];
        if (!this.async && this.iterations > 10000)
            throw "Number synchronous iterations exceeds hard limit of 10000: "+this.iterations;
    } else
        this.propname = this.props["property"];
}