function handler(In) {
    this.getInputReference("Flag")().off();
    this.executeOutputLink("Out", In);
}