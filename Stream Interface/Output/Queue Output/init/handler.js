function handler() {
    if (this.props["autocreate"]) {
        stream.cli()
            .exceptionOff()
            .execute("cc sys$queuemanager/queues")
            .execute("new "+this.props["queuename"])
            .execute("save");
    }
    stream.create().output(this.props["queuename"]).queue();
}