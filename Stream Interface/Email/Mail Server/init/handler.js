function handler() {
    var self = this;

    stream.create().mailserver(self.props["hostname"])
        .port(self.props["port"])
        .username(self.props["username"])
        .password(self.props["password"]);

    this.setOutputReference("MailServer", execRef);

    function execRef() {
        return stream.mailserver(self.props["hostname"]);
    }
}