function handler(In) {
    this.getInputReference("Memory")().add(In);
    this.executeOutputLink("Out", In);
}