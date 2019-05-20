function handler() {
    this.bit_startpos = this.props["bit_startpos"];
    this.bit_length = this.props["bit_length"];
    this.properties = this.props["properties"];
    this.BOOLEAN = Java.type("java.lang.Boolean");
    this.INTEGER = Java.type("java.lang.Integer");
    this.LONG = Java.type("java.lang.Long");
    this.DOUBLE = Java.type("java.lang.Double");
    this.FLOAT = Java.type("java.lang.Float");

    if (this.bit_startpos.length !== this.properties.length || this.bit_startpos.length !== this.bit_length.length)
        throw "Invalid number of entries for types, values or length";
}