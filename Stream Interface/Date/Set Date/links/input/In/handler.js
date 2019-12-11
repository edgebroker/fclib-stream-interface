function handler(In) {
    var year = this.props["year"];
    var month = this.props["month"];
    var day = this.props["day"];
    var out = this.props["outprop"];
    var today = this.props["today"];
    var date;
    var newdate;

    if(today){
        date = new Date;
        newdate = date.toISOString().slice(0,10);
    }else{
        if(month.toString().length === 1){
            month = "0"+month;
        }

        if(day.toString().length === 1){
            day = "0"+day;
        }

        newdate = year.toString() + "-" + month.toString() + "-" + day.toString();
    }

    In.property(out).set(newdate);

    this.executeOutputLink("Out", In);
}