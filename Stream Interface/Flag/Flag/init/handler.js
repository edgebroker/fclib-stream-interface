function handler() {
    var self = this;
    this.state = this.props["initstate"];

    this.getState = function(){
        return self.state;
    };

    this.on = function(){
        self.state = "On";
    };

    this.off = function(){
        self.state = "Off";
    };

    this.setOutputReference("Flag", execRef);

    function execRef() {
        return self;
    }
}