function handler(In) {
    var self = this;
    this.setOutputReference("Message", execRef);

    function execRef() {
        return self.message;
    }
}