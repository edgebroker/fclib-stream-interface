function handler(In) {
    this.getInputReference("Memory")().clear();
    this.executeOutputLink("Out", In);
}