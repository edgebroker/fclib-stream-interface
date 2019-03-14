function handler(message) {
    var self = this;
    var from = this.props["from"];
    var to = this.props["to"];
    var cc = this.props["cc"];
    var bcc = this.props["bcc"];
    var subject = this.props["subject"];
    var body = this.props["body"];
    if (message.type() === "text")
        body = replaceAll(body, "{body}", message.body());

    message.properties().forEach(function(prop){
        from = replaceAll(from, "\\{"+prop.name()+"\\}", prop.value().toString());
        to = replaceAll(to, "\\{"+prop.name()+"\\}", prop.value().toString());
        if (cc)
            cc = replaceAll(cc, "\\{"+prop.name()+"\\}", prop.value().toString());
        if (bcc)
            bcc = replaceAll(bcc, "\\{"+prop.name()+"\\}", prop.value().toString());
        subject = replaceAll(subject, "\\{"+prop.name()+"\\}", prop.value().toString());
        body = replaceAll(body, "\\{"+prop.name()+"\\}", prop.value().toString());
    });

    var email = this.getInputReference("MailServer")().email();
    email.from(from);
    email.to(to);
    if (cc)
        email.cc(cc);
    if (bcc)
        email.bcc(bcc);
    email.subject(subject);
    email.body(body);
    email.send();

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
}