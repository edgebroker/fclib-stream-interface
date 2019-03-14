function handler(In) {
    var self = this;
    var rootMsg = self.getInputReference("Root")();
    var body = "<"+self.props["roottag"];
    var rootAttr = self.props["rootattr"];
    var rootProps = self.props["rootprops"];
    for (var i=0;i<rootAttr.length;i++){
        var value = "";
        body += " "+rootAttr[i]+"=\"";
        if (rootMsg.property(rootProps[i]).exists())
            body += rootMsg.property(rootProps[i]).value().toString();
        body += "\"";
    }
    body += ">\n";
    var eleAttr = self.props["eleattr"];
    var eleProps = self.props["eleprops"];
    In.forEach(function(msg){
       body += "  <"+self.props["eletag"];
        for (var i=0;i<eleAttr.length;i++){
            var value = "";
            body += " "+eleAttr[i]+"=\"";
            if (msg.property(eleProps[i]).exists())
                body += msg.property(eleProps[i]).value().toString();
            body += "\"";
        }
        body += "/>\n";
    });
    body += "</"+self.props["roottag"]+">";
    var outMsg = stream.create().message().textMessage().persistent().body(body);
    self.executeOutputLink("Out", outMsg);
}