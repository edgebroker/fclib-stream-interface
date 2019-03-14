function handler(In) {
    var self = this;
    if (condition(In))
        this.executeOutputLink("Match", In);
    else
        this.executeOutputLink("No Match", In);

    function condition(In) {
        /*${condition}*/
    }
}