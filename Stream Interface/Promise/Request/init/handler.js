function handler() {
    var self = this;
    var seqNumber = 0;

    stream.create().input(stream.create().tempQueue(self.compid+"-reply")).queue().onInput(function(input){
        var correlationId = input.current().correlationId();
        if (!correlationId || correlationId === null)
            this.executeOutputLink("Invalid", input.current());
        else {
            var mem = stream.memory(this.compid+"-requests").index("_correlationid").get(correlationId);
            if (mem.size() === 0)
                this.executeOutputLink("Invalid", input.current());
            else {
                stream.memory(this.compid+"-requests").index("_correlationid").remove(correlationId);
                this.executeOutputLink("Reply", input.current());
            }
        }

    });
    stream.create().memory(self.compid+"-requests").heap()
        .limit().time().second(self.props["timeout"])
        .createIndex("_correlationid")
        .onRetire(function(retired){
            retired.forEach(function(message){
                self.executeOutputLink("Timeout", message);
            });
        });

    stream.create().timer().interval().seconds(self.props["timeout"]).onTimer(function(timer){
       stream.memory(self.compid+"-requests").checkLimit();
    });

    this.getUUID = function(){
        var uuid = stream.fullyQualifiedName()+"-"+self.compid+"-"+(self.seqNumber++);
        if (seqNumber = Number.MAX_VALUE)
            seqNumber = 0;
        return uuid;
    }
}