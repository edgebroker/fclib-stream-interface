function handler(In) {
    var self = this;
    var out = stream.create().message().textMessage();
    var array = [];

    In.forEach(function(msg){
       var json = {};
       msg.properties().forEach(function(prop){
           if (isIncluded(prop.name()))
            json[prop.name()] = prop.value().toObject();
       });
       array.push(order(json));
    });

    out.body(JSON.stringify(array));

    this.executeOutputLink("Out", out) ;

   function isIncluded(name) {
       if (!self.props["filter"]||self.props["filter"].length === 0)
           return true;
       for (var i=0;i<self.props["filter"].length; i++) {
           if (name === self.props["filter"][i])
               return true;
       }
       return false;
   }

   function order(inJson) {
       if (!self.props["filter"]||self.props["filter"].length === 0)
           return inJson;
       var outJson = {};
       for (var i=0;i<self.props["filter"].length; i++) {
           outJson[self.props["filter"][i]] = inJson[self.props["filter"][i]];
       }
       return outJson;
   }
}