function handler(In) {
    var self = this;
    var date = In.property(this.props["date"]).value().toString();
    var month = In.property(this.props["month"]).value().toInteger();
    var out = this.props["outprop"];

    date.setDate(date.getMonth() + month);
    var newdate = date.toISOString().slice(0,10);

    In.property(out).set(newdate);

    this.executeOutputLink("Out", In);
}