function handler(In) {
    if (In.type() !== "bytes")
        throw "Input message must be a BytesMessage!";
    if (In.body() === null)
        throw "BytesMessage body is null!";
    var FEEDMESSAGE = Java.type("com.google.transit.realtime.GtfsRealtime.FeedMessage");
    var feedMessage = FEEDMESSAGE.parseFrom(In.body());
    var entities = feedMessage.getEntityList();
    for (var i = 0; i < entities.size(); i++) {
        var out = stream.create().message().textMessage();
        out.copyProperties(In);
        var entity = entities.get(i);
        var json = {
            id: entity.getVehicle().getVehicle().getId(),
            label: entity.getVehicle().getVehicle().getId(),
            long: entity.getVehicle().getPosition().getLongitude(),
            lat: entity.getVehicle().getPosition().getLatitude(),
            timestamp: entity.getVehicle().getTimestamp()
        };
        if (entity.getVehicle().getVehicle().hasLabel())
            json.label = entity.getVehicle().getVehicle().getLabel();
        if (entity.getVehicle().getPosition().hasSpeed())
            json.speed = entity.getVehicle().getPosition().getSpeed();
        out.property("id").set(json.id);
        out.property("label").set(json.label);
        out.property("long").set(json.long);
        out.property("lat").set(json.lat);
        out.property("timestamp").set(json.timestamp);
        if (json.speed)
            out.property("speed").set(json.speed);
        out.body(JSON.stringify(json));
        this.executeOutputLink("Out", out);
    }
}