function handler(In) {
    stream.create().output(null).forAddress(In.replyTo()).send(In).close();
    this.executeOutputLink("Out", In);
}