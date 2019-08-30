function handler(In) {
    if (In.type() !== "map")
        throw "Input message is not a map message but: "+In.type();
    In.properties().forEach(function(prop){
       In.body().set(prop.name(), prop.value().toObject());
    });
    this.executeOutputLink("Out", out);
}