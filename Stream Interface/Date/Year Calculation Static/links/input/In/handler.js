function handler(In) {
    var self = this;
    var date = In.property(this.props["date"]).value().toString();
    var year = this.props["year"];
    var out = this.props["outprop"];

    date.setFullYear(date.getFullYear() + year);
    var newdate = date.toISOString().slice(0,10);

    In.property(out).set(newdate);

    this.executeOutputLink("Out", In);
}