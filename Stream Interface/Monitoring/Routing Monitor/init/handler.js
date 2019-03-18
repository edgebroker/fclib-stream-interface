function handler() {
    var self = this;

    this.states = [];
    for (var i = 0; i < this.props["routers"].length; i++)
        this.states[this.props["routers"][i]] = "UNREACHABLE";

    this.lastState = "NONE";


    stream.create().input("sys$routing/usage/routing-table").management()
        .onAdd(function (input) {
            setState(input.current().property("name").value().toString(), "REACHABLE");
        })
        .onRemove(function (input) {
            setState(input.current().property("name").value().toString(), "UNREACHABLE");
        });

    function setState(routername, state){
        stream.log().info("setState: "+routername+": "+state);
        for (var stateRouter in self.states){
            if (stateRouter === routername){
                self.states[stateRouter] = state;
            }
        }
    }

    this.collectStates = function (){
        var result = "";
        for (var stateRouter in self.states){
            result += stateRouter+": "+self.states[stateRouter]+"\n";
         }
        return result;
    };

    this.newState = function() {
        for (var stateRouter in self.states){
            if (self.states[stateRouter] === "UNREACHABLE")
                return "RED";
         }
         return "GREEN";
    };

    this.checkState = function () {
        var ns = self.newState();
        if (ns !== self.lastState) {
            var msg = stream.create().message().message()
                .property("state").set(ns)
                .property("routerstates").set(self.collectStates());
            self.executeOutputLink(ns, msg);
        }
        self.lastState = ns;
    }
}