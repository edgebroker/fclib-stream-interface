function handler(Request) {
    var uuid = this.getUUID();
    Request.property("_correlationid").set(uuid);
    Request.correlationId(uuid);
    stream.memory(this.compid+"-requests").add(Request);
    this.executeOutputLink("OutRequest", Request);
}