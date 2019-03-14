function handler() {
    var self = this;
    if (this.props["selector"]) {
        stream.create().input(this.compid).topic()
            .destinationName(this.props["topicname"])
            .selector(this.props["selector"])
            .onInput(function (input) {
                self.executeOutputLink("Out", input.current());
            });
    } else {
        stream.create().input(this.compid).topic()
            .destinationName(this.props["topicname"])
            .onInput(function (input) {
                self.executeOutputLink("Out", input.current());
            });
    }
}