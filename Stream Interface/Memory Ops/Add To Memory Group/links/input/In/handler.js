function handler(In) {
    this.getInputReference("MemoryGroup")().add(In);
    this.executeOutputLink("Out", In);
}