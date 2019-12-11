function handler(In) {
    if (In.type() !== "text")
        throw "Input message must be a TextMessage!";
    if (In.body() === null)
        throw "TextMessage body is null!";
    var STRING = Java.type("java.lang.String");
    var BASE64 = Java.type("java.util.Base64");
    In.body(new STRING(BASE64.getEncoder().encode(In.body().getBytes())));
    this.executeOutputLink("Out", In);
}