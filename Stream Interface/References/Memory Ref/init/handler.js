function handler(In) {
    var self = this;
    this.setOutputReference("Memory", execRef);

    function execRef() {
        return self.memory;
    }
}