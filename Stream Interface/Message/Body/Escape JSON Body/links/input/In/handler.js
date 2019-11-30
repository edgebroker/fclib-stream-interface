function handler(In) {
    if (In.type() !== "text")
        throw "Incoming message is not a text message!";
    var JSONValue = Java.type("org.json.simple.JSONValue");
    In.body(JSONValue.escape(In.body()));
    this.executeOutputLink("Out", In);
}