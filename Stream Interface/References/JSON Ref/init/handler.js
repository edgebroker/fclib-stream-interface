function handler() {
    var self = this;
    this.setOutputReference("JSON", execRef);

    function execRef() {
        return self.json;
    }
}