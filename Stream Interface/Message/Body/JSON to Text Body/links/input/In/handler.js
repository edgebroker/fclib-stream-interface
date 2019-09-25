function handler(In) {
    this.body = bodyValue(In);
    var outMsg = stream.create().message().textMessage();
    outMsg.body(this.body);
    this.executeOutputLink("Out", outMsg);

    function bodyValue(value) {
        if (shouldStringify(value)) {
            return JSON.stringify(value);
        } else {
            return value;
        }
    }

    function shouldStringify(value) {
        return typeof value === "object";
    }

}
