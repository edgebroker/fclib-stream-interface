function handler(In) {
    var self = this;

    if (In.type() !== "text")
        throw "Incoming message is not a text message";
    var ref = this.getInputReference("Message")();
    if (ref.type() !== "text")
        throw "Referenced message is not a text message";
    if (In.type() !== "text")
        throw "Incoming message is not a text message";
    var delimiter = this.props["delimiter"]?this.props["delimiter"]:"";
    if (ref.body() !== null && ref.body().length() > 0)
        ref.body(ref.body()+delimiter+In.body());
    else
        ref.body(In.body());
    this.executeOutputLink("Out", In) ;
}