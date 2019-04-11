function handler(In) {
     var json = JsonFromMessage(In);
     this.executeOutputLink("Out", json);
     this.setOutputReference("Message", json);

     function JsonFromMessage(In) {
         var result = {};
         In.properties().forEach(function(prop) {
             var propName = prop.name();
             var value = prop.value().toObject();
             result[propName]  = value;
         });
         return result;
     }

}