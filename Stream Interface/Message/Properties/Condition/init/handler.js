function handler() {
    var MessageSelector = Java.type("com.swiftmq.ms.MessageSelector");
    this.ms = new MessageSelector(this.props["selector"]);
    this.ms.compile();
}