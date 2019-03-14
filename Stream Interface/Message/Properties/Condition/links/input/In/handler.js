function handler(In) {
    if (In.isSelected(this.ms))
        this.executeOutputLink("Match", In);
    else
        this.executeOutputLink("No Match", In);
}