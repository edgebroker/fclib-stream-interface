function handler() {
    this.executor = function () {
        if (this.props["exceptionoff"] === true)
            stream.cli().exceptionOff();
        else
            stream.cli().exceptionOn();
        var cmds = this.props["commands"];
        for (var i = 0; i < cmds.length; i++)
            stream.cli().execute(cmds[i]);
    };
    if (this.props["executeoninit"] === true)
        this.executor();
}