function handler(In) {

    if (In.type() !== "text") {
        throw "Incoming message is not a text message";
    }

    stream.log().info(In.body());

    this.json = JSON.parse(In.body());
    stream.log().info(JSON.stringify(this.json));
    this.executeOutputLink("Out", this.json);
}