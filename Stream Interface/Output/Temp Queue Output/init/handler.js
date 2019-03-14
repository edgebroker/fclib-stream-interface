function handler() {
    stream.create().output(this.props["jndiname"]).forAddress(stream.lookupJNDI(this.props["jndiname"]));
}