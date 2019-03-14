function handler(In) {
    this.send(In);
    this.executeOutputLink("Out", In);
}