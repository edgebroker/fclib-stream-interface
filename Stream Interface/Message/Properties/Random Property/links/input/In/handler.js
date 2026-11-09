function handler(In) {
    // The configuration is validated once, on the first message (this component has no init handler).
    if (!this.cfg)
        this.cfg = configure(this.props);
    var cfg = this.cfg;

    if (chance(cfg.nullrate))
        In.property(cfg.property).set(null);
    else
        In.property(cfg.property).set(typeconvert.toDouble(randomValue().toFixed(cfg.decimals)));

    this.executeOutputLink("Out", In);

    function randomValue() {
        if (chance(cfg.outlierrate))
            return uniform(cfg.outlier);
        if (cfg.phase && time.currentTime() % cfg.phase.periodMs < cfg.phase.durationMs)
            return uniform(cfg.phase);
        return uniform(cfg.normal);
    }

    function uniform(range) {
        return range.min + Math.random() * (range.max - range.min);
    }

    function chance(percent) {
        return percent > 0 && Math.random() * 100 < percent;
    }

    function configure(props) {
        var result = {
            property: props["property"],
            decimals: intProp("decimals", 1, 0, 15, "Decimals"),
            outlierrate: intProp("outlierrate", 0, 0, 100, "Outlier Rate"),
            nullrate: intProp("nullrate", 0, 0, 100, "Null Rate"),
            normal: range("min", "max", "Min", "Max")
        };
        if (result.outlierrate > 0)
            result.outlier = range("outliermin", "outliermax", "Outlier Min", "Outlier Max");
        var phaseSeconds = intProp("phaseseconds", 0, 0, undefined, "Phase Seconds");
        var phasePeriod = intProp("phaseperiod", 0, 0, undefined, "Phase Period");
        if (phaseSeconds > 0 && phasePeriod > 0) {
            if (phaseSeconds > phasePeriod)
                throw "Phase Seconds must be <= Phase Period!";
            result.phase = range("phasemin", "phasemax", "Phase Min", "Phase Max");
            result.phase.durationMs = phaseSeconds * 1000;
            result.phase.periodMs = phasePeriod * 1000;
        }
        return result;

        function intProp(name, def, lo, hi, label) {
            var value = props[name];
            if (value === undefined || value === null || value === "")
                return def;
            value = Number(value);
            if (isNaN(value) || Math.floor(value) !== value || value < lo || (hi !== undefined && value > hi))
                throw label + " must be an integer " + (hi === undefined ? ">= " + lo : "between " + lo + " and " + hi) + "!";
            return value;
        }

        function range(minName, maxName, minLabel, maxLabel) {
            var r = {min: doubleProp(minName, minLabel), max: doubleProp(maxName, maxLabel)};
            if (r.min > r.max)
                throw minLabel + " must be <= " + maxLabel + "!";
            return r;
        }

        function doubleProp(name, label) {
            var value = props[name];
            var s = value === undefined || value === null ? "" : String(value).trim();
            var d = Number(s);
            if (s === "" || isNaN(d) || !isFinite(d))
                throw label + " must be a double number, got: '" + s + "'!";
            return d;
        }
    }
}
