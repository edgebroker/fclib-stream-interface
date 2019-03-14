function handler(In) {
    if (this.getInputReference("Flag")().getState() === "On")
        this.executeOutputLink("Set", In);
    else
        this.executeOutputLink("Unset", In);
}