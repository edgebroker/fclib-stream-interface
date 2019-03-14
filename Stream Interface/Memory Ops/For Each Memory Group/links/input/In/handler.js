function handler(In) {
    var self = this;
    this.getInputReference("MemoryGroup")().forEach(function(memory){
        self.executeOutputLink("Out", memory);
    });
}