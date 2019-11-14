function handler(In) {
    if (In.type() !== "bytes")
        throw "Input message must be a BytesMessage!";
    if (In.body() === null)
        throw "BytesMessage body is null!";
    var FEEDMESSAGE = Java.type("com.google.transit.realtime.GtfsRealtime.FeedMessage");
    var feedMessage = FEEDMESSAGE.parseFrom(In.body());
    var entities = feedMessage.getEntityList();
    for (var i = 0; i < entities.size(); i++) {
        var out = stream.create().message().message();
        out.copyProperties(In);
        var entity = entities.get(i);
        out.property("id").set(entity.getVehicle().getVehicle().getId());
        out.property("label").set(entity.getVehicle().getVehicle().getId());
        if (entity.getVehicle().getVehicle().hasLabel())
            out.property("label").set(entity.getVehicle().getVehicle().getLabel());
        out.property("long").set(entity.getVehicle().getPosition().getLongitude());
        out.property("lat").set(entity.getVehicle().getPosition().getLatitude());
        out.property("timestamp").set(entity.getVehicle().getTimestamp());
        if (entity.getVehicle().getPosition().hasSpeed())
            out.property("speed").set(entity.getVehicle().getPosition().getSpeed());
        this.executeOutputLink("Out", out);
    }
}