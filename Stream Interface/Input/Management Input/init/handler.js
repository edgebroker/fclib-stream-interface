function handler() {
    var self = this;
    if (this.props["selector"]) {
        stream.create().input(this.props["context"])
            .management()
            .selector(this.props["selector"]);
    } else {
        stream.create().input(this.props["context"])
            .management();
    }
    if (this.props["include"] && this.props["include"].trim().length > 0)
        stream.input(this.props["context"]).include(this.props["include"]);
    if (this.props["add"] === true)
        stream.input(this.props["context"]).onAdd(function (input) {
            self.executeOutputLink("Add", input.current());
        });
    if (this.props["change"] === true)
        stream.input(this.props["context"]).onChange(function (input) {
            self.executeOutputLink("Change", input.current());
        });
    if (this.props["remove"] === true)
        stream.input(this.props["context"]).onRemove(function (input) {
            self.executeOutputLink("Remove", input.current());
        });
}