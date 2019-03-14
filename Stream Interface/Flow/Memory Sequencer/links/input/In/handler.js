function handler(In) {
    for (var i = 0; i < this.props["outputs"].length; i++) {
            this.executeOutputLink(this.props["outputs"][i], In);
    }
}                                         