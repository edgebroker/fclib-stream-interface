function handler() {
    var self = this;
    // Interval timers are not aligned to the clock, so a short tick checks for window ends.
    // windowstart/windowend are exact; emission happens at most one tick after windowend.
    var TICK_MS = 500;

    var windowMs = this.props["seconds"] * 1000;
    if (!(windowMs > 0))
        throw "Window Length must be > 0!";
    var sliding = this.props["window"] === "sliding";
    var stepMs = windowMs;
    if (sliding) {
        stepMs = this.props["step"] * 1000;
        if (!(stepMs > 0) || stepMs > windowMs)
            throw "Step must be > 0 and <= Window Length for sliding windows!";
    }

    // Values are aggregated into buckets of gcd(window, step) so that every window is an exact
    // union of buckets. Tumbling windows use exactly one bucket per window.
    var bucketMs = gcd(windowMs, stepMs);
    var startTime = time.currentTime();
    var origin = this.props["aligned"] === false ? startTime : 0;
    var nextEnd = origin + (Math.floor((startTime - origin) / stepMs) + 1) * stepMs;
    var buckets = {};
    var seq = 0;

    this.add = function (message) {
        var keyObj = self.props["property"];
        if (self.props["keyproperty"]) {
            if (!self.assertProperty(message, self.props["keyproperty"]))
                return;
            keyObj = message.property(self.props["keyproperty"]).value().toObject();
        }
        var value = NaN;
        var prop = message.property(self.props["property"]);
        if (prop.exists()) {
            try {
                value = prop.value().toDouble();
            } catch (e) {
                // not numeric
            }
        }
        var valid = isFinite(value);
        if (!valid && self.props["countinvalid"] === false)
            return;
        var stats = getStats(bucketOf(time.currentTime()), keyObj);
        if (valid) {
            stats.min = Math.min(stats.min, value);
            stats.max = Math.max(stats.max, value);
            stats.sum += value;
            stats.count++;
        } else
            stats.invalid++;
    };

    stream.create().timer(this.compid).interval()
        .milliseconds(TICK_MS)
        .onTimer(function (timer) {
            var now = time.currentTime();
            while (nextEnd <= now) {
                emit(nextEnd - windowMs, nextEnd);
                nextEnd += stepMs;
                prune(nextEnd - windowMs);
            }
        });

    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    function bucketOf(t) {
        return origin + Math.floor((t - origin) / bucketMs) * bucketMs;
    }

    function getStats(bucketStart, keyObj) {
        var bucket = buckets[bucketStart];
        if (!bucket)
            bucket = buckets[bucketStart] = {};
        var k = "k" + keyObj;
        var stats = bucket[k];
        if (!stats)
            stats = bucket[k] = newStats(keyObj);
        return stats;
    }

    function newStats(keyObj) {
        return {key: keyObj, min: Infinity, max: -Infinity, sum: 0, count: 0, invalid: 0};
    }

    function emit(windowStart, windowEnd) {
        var result = {};
        for (var b in buckets) {
            var bucketStart = Number(b);
            if (bucketStart < windowStart || bucketStart >= windowEnd)
                continue;
            var bucket = buckets[b];
            for (var k in bucket) {
                var s = bucket[k];
                var r = result[k];
                if (!r)
                    r = result[k] = newStats(s.key);
                r.min = Math.min(r.min, s.min);
                r.max = Math.max(r.max, s.max);
                r.sum += s.sum;
                r.count += s.count;
                r.invalid += s.invalid;
            }
        }
        for (var key in result) {
            var stats = result[key];
            var msg = stream.create().message().message()
                .messageId("windowstatistics-" + self.flowname + "-" + self.compid + "-" + startTime + "-" + (++seq))
                .property("key").set(stats.key)
                .property("count").set(stats.count)
                .property("invalid").set(stats.invalid)
                .property("windowstart").set(windowStart)
                .property("windowend").set(windowEnd);
            if (stats.count > 0) {
                msg.property("min").set(stats.min)
                    .property("max").set(stats.max)
                    .property("avg").set(stats.sum / stats.count);
            }
            self.executeOutputLink("Out", msg);
        }
    }

    // Removes buckets that are no longer part of any upcoming window.
    function prune(oldestNeeded) {
        for (var b in buckets) {
            if (Number(b) < oldestNeeded)
                delete buckets[b];
        }
    }
}
