function handler(In) {
    var year = this.props["year"];
    var month = this.props["month"];
    var day = this.props["day"];
    var out = this.props["outprop"];
    var today = this.props["today"];
    var date, newdate;

    if(today){
        date = new Date;
        newdate = date.toISOString().slice(0,10);
    }else{
        date = new Date(year, month, day);
        newdate = date.toISOString().slice(0,10);
    }

    In.property(out).set(newdate);

    this.executeOutputLink("Out", In);
}