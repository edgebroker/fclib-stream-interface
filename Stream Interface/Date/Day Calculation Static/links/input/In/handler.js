function handler(In) {
    var self = this;
    var date = In.property(this.props["date"]).value().toString();
    var days = this.props["days"];
    var out = this.props["outprop"];

    date.setDate(date.getDate() + days);
    var newdate = date.toISOString().slice(0,10);

    In.property(out).set(newdate);

    this.executeOutputLink("Out", In);
}