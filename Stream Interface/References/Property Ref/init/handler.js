function handler(In) {
    var self = this;
    this.setOutputReference("Property", execRef);

    function execRef() {
        return self.property;
    }
}