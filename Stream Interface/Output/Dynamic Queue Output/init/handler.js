function handler() {
    var self = this;
    this.queuesCreated = {};

    this.createIfNecessary = function(queueName) {
        if (self.props["autocreate"] && !self.queuesCreated[queueName]) {
            stream.cli()
                .exceptionOff()
                .execute("cc sys$queuemanager/queues")
                .execute("new "+this.props["queuename"])
                .execute("save");
            self.queuesCreated[queueName] = true;
        }

    }
}