function handler(In) {
    if (In.property(this.props["property"]).exists())
        this.executeOutputLink("Yes", In);
    else
        this.executeOutputLink("No", In);
}