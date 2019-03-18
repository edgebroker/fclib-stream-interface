function handler() {
    var self = this;
    this.partitionName = stream.getWorkingDirectory();
    if (this.props["partition"])
        this.partitionName = this.props["partition"];
    this.yellowTH = this.props["threshold-yellow"];
    this.redTH = this.props["threshold-red"];
    if (this.redTH <= this.yellowTH)
        throw "Threshold RED must be > Threshold YELLOW!";
    this.dimension = this.props["dimension"];
    this.devider = 0;
    switch (this.dimension){
        case "MB":
            this.devider = 1024*1024;
            break;
        case "GB":
            this.devider = 1024*1024*1024;
            break;
    }

    this.lastState = "NONE";

    this.checkState = function(){
        var total = Math.round(os.totalSpace(self.partitionName)/self.devider);
        var usable = Math.round(os.usableSpace(self.partitionName)/self.devider);
        var free = total-usable;
        var usedPercent = Math.round((usable/total)*100);
        var freePercent = Math.round((free/total)*100);
        var msg = stream.create()
            .message()
            .message()
            .property("partition").set(self.partitionName)
            .property("total").set(total)
            .property("used").set(usable)
            .property("free").set(free)
            .property("used_percent").set(usedPercent)
            .property("free_percent").set(freePercent);
        stream.log().info(self.partitionName+"="+msg);
        if (usedPercent >= self.redTH && self.lastState !== "RED") {
            self.lastState = "RED";
            self.executeOutputLink("red", msg);
        } else if (usedPercent >= self.yellowTH && self.lastState !== "YELLOW") {
            self.lastState = "YELLOW";
            self.executeOutputLink("yellow", msg);
        } else if (usedPercent < self.yellowTH && self.lastState !== "GREEN") {
            self.lastState = "GREEN";
            self.executeOutputLink("green", msg);
        }

    }
}