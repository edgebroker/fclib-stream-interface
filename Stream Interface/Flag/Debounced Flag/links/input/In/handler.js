function handler(In) {
    var ignoremissing = this.props["ignoremissing"];
    var keyproperty = this.props["keyproperty"];
    if (ignoremissing && !In.property(ignoremissing).exists()) {
        this.reject(In, ignoremissing);
        return;
    }
    if (keyproperty && !In.property(keyproperty).exists()) {
        this.reject(In, keyproperty);
        return;
    }

    var key = keyproperty ? In.property(keyproperty).value().toString() : "";
    var state = this.getState(key);
    var previousCount = state.count;

    // A cleared key counts matches, a raised key counts non-matches; the other outcome resets the count
    if (In.isSelected(this.ms) === state.raised) {
        state.count = 0;
    } else if (++state.count >= (state.raised ? this.clearAfter : this.raiseAfter)) {
        var count = state.count;
        state.raised = !state.raised;
        state.count = 0;
        this.setState(key, state);
        if (state.raised)
            this.emit(In, "Raised", key, "RAISED", count);
        else
            this.emit(In, "Cleared", key, "CLEARED", count);
        return;
    }
    // Only touch the (possibly persistent) memory if the count actually changed
    if (state.count !== previousCount)
        this.setState(key, state);
}
