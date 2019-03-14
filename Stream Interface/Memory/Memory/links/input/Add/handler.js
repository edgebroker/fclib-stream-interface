function handler(message) {
    if (this.props["orderby"] && this.assertProperty(message, this.props["orderby"])) {
        if (this.props["indexes"]) {
            for (var i = 0; i < this.props["indexes"].length; i++)
                if (!this.assertProperty(message, this.props["indexes"][i]))
                    return;
        }

    }
    stream.memory(this.compid).add(message);
    this.executeOutputLink("Out", message);
}