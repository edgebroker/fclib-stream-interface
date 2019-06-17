function handler(In) {
    var self = this;
    var rootMsg = self.getInputReference("Root")();
    var body = "<"+self.props["roottag"];
    var rootAttributes = self.props["rootattributes"];
    var childAttributes = self.props["childattributes"];

    for (var i=0;i<rootAttributes.length;i++){
        var value = "";
        var name = rootAttributes[i]["name"].value;
        var propertyName = rootAttributes[i]["property"].value;

        body += " "+name+"=\"";
        if (rootMsg.property(propertyName).exists())
            body += rootMsg.property(propertyName).value().toString();
        body += "\"";
    }
    body += ">\n";

    In.forEach(function(msg){
       body += "  <"+self.props["eletag"];
        for (var i=0;i<childAttributes.length;i++){            
            var value = "";
            var name = childAttributes[i]["name"].value;
            var propertyName = childAttributes[i]["property"].value;            
            body += " "+name+"=\"";
            if (msg.property(propertyName).exists())
                body += msg.property(propertyName).value().toString();
            body += "\"";
        }
        body += "/>\n";
    });
    body += "</"+self.props["roottag"]+">";
    var outMsg = stream.create().message().textMessage().persistent().body(body);
    self.executeOutputLink("Out", outMsg);
}