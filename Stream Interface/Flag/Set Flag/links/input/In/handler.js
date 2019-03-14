function handler(In) {
    this.getInputReference("Flag")().on();
    this.executeOutputLink("Out", In);
}