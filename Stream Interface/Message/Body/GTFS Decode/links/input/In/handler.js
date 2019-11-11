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
        if (entity.getVehicle().getTrip().hasRouteId()) {
            var delay = 0;
            var occupancy = "GREEN";
            if (entity.hasTripUpdate() && entity.getTripUpdate().hasDelay())
                delay = entity.getTripUpdate().hasDelay();
            if (entity.getVehicle().hasOccupancyStatus()){
                switch (entity.getVehicle().hasOccupancyStatus()){
                    case 2:
                    case 3:
                        occupancy = "YELLOW";
                    case 4:
                    case 5:
                        occupancy = "RED";
                }
            }
            var json = {
                routeid: entity.getVehicle().getTrip().getRouteId(),
                long: entity.getVehicle().getPosition().getLongitude(),
                lat: entity.getVehicle().getPosition().getLatitude(),
                timestamp: entity.getVehicle().getTimestamp(),
                delay: delay,
                occupancy: occupancy
            };
            out.property("routeid").set(json.routeid);
            out.property("long").set(json.long);
            out.property("lat").set(json.lat);
            out.property("delay").set(json.delay);
            out.property("occupancy").set(json.occupancy);
            out.property("timestamp").set(json.timestamp);
            out.body(JSON.stringify(json));
            this.executeOutputLink("Out", out);
        }
    }
}