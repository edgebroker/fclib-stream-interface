function handler(In) {
    var self = this;
    var date = In.property(this.props["date"]).value().toString();
    var days = In.property(this.props["days"]).value().toInteger();
    var out = this.props["outprop"];

    date = new Date(date);
    date.setDate(date.getDate() + days);
    var newdate = date.toISOString().slice(0,10);

    In.property(out).set(newdate);

    this.executeOutputLink("Out", In);
}