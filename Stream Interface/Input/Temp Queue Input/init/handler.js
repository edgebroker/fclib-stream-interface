function handler() {
    var self = this;
    stream.create().tempQueue(this.props["queuename"]);
    if (this.props["registerjndi"] === true)
        stream.tempQueue(this.props["queuename"]).registerJNDI();
    if (this.props["wiretap"] === true) {
        if (this.props["selector"]) {
            stream.create().input(stream.tempQueue(this.props["queuename"]))
                .wiretap(this.flowname + "_" + this.compid)
                .selector(this.props["selector"])
                .onInput(function (input) {
                    self.executeOutputLink("Out", input.current());
                });
        } else {
            stream.create().input(stream.tempQueue(this.props["queuename"]))
                .wiretap(this.flowname + "_" + this.compid)
                .onInput(function (input) {
                    self.executeOutputLink("Out", input.current());
                });
        }
    } else {
        if (this.props["selector"]) {
            stream.create().input(stream.tempQueue(this.props["queuename"]))
                .queue()
                .selector(this.props["selector"])
                .onInput(function (input) {
                    self.executeOutputLink("Out", input.current());
                });
        } else {
            stream.create().input(stream.tempQueue(this.props["queuename"]))
                .queue()
                .onInput(function (input) {
                    self.executeOutputLink("Out", input.current());
                });
        }

    }
}