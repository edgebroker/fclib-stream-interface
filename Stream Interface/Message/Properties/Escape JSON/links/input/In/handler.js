function handler(In) {
    this.assertProperty(In, this.props["property"]);
    var JSONValue = Java.type("org.json.simple.JSONValue");
    In.property(this.props["property"]).set(JSONValue.escape(In.property(this.props["property"]).value().toString()));
    this.executeOutputLink("Out", In);
}