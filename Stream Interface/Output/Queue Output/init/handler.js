function handler() {
    stream.create().output(this.props["queuename"]).queue();
}