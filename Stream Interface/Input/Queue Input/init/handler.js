function handler() {
    var self = this;
    if (this.props["autocreate"]) {
        stream.cli()
            .exceptionOff()
            .execute("cc sys$queuemanager/queues")
            .execute("new "+this.props["queuename"])
            .execute("save");
    }
    if (this.props["wiretap"] === true) {
        if (this.props["selector"]) {
            stream.create().input(this.props["queuename"])
                .wiretap(this.flowname + "_" + this.compid)
                .selector(this.props["selector"])
                .onInput(function (input) {
                    self.executeOutputLink("Out", input.current());
                });
        } else {
            stream.create().input(this.props["queuename"])
                .wiretap(this.flowname + "_" + this.compid)
                .onInput(function (input) {
                    self.executeOutputLink("Out", input.current());
                });
        }
    } else {
        if (this.props["selector"]) {
            stream.create().input(this.props["queuename"])
                .queue()
                .selector(this.props["selector"])
                .onInput(function (input) {
                    self.executeOutputLink("Out", input.current());
                });
        } else {
            stream.create().input(this.props["queuename"])
                .queue()
                .onInput(function (input) {
                    self.executeOutputLink("Out", input.current());
                });
        }

    }
}