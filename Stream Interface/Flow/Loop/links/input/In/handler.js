function handler(In) {
    var self = this;
    if (this.staticdef) {
        if (this.async) {
            loopAsync(In, this.iterations);
        } else {
            loopSync(In, this.iterations);
        }
    } else {
        if (!this.assertProperty(In, this.propname))
            return;
        var iter = In.proerty(this.propname).value().toInteger();
        if (!this.async && iter > 10000)
            throw "Number synchronous iterations exceeds hard limit of 10000: " + iter;
        if (this.async) {
            loopAsync(In, iter);
        } else {
            loopSync(In, iter);
        }
    }

    function loopSync(In, n) {
        for (var i = 0; i < n; i++) {
            self.executeOutputLink("Out", In);
        }
    }

    function loopAsync(In, n) {
        for (var i = 0; i < n; i++) {
            stream.executeCallback(function (msg) {
                self.executeOutputLink("Out", msg);
            }, In);
        }
    }
}