function handler(In) {

    if (In.type() !== "text") {
        throw "Incoming message is not a text message";
    }
    this.json = JSON.parse(In.body());
    this.executeOutputLink("Out", this.json);
}