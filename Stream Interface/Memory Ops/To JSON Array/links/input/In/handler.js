function handler(In) {
    var out = stream.create().message().textMessage();
    var array = [];

    In.forEach(function(msg){
       var json = {};
       msg.properties().forEach(function(prop){
           json[prop.name()] = prop.value().toObject();
       });
       array.push(json);
    });

    out.body(JSON.stringify(array));

    this.executeOutputLink("Out", out) ;


}