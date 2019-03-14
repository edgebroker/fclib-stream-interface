function handler(In) {
    var self = this;
    if (condition(In))
        this.executeOutputLink("Match", In);
    else
        this.executeOutputLink("No Match", In);

    function condition(mem) {
        var size = mem.size();
        var value = self.getInputReference("Property")().value().toInteger();
        switch (self.props["comparision"]){
            case "=":
                return size === value;
            case "!=":
                return size !== value;
            case "<":
                return size < value;
            case "<=":
                return size <= value;
            case ">":
                return size > value;
            case ">=":
                return size >= value;
        }
        return false;
    }
}