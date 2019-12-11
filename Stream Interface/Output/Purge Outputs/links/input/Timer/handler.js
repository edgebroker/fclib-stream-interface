function handler(Timer) {
    // This is currently buggy so we need to do it ourself
    // stream.purgeOutputs();
    var outputs = stream.getOutputs();
    if (outputs !== null && outputs.length > 0) {
        for (var i = 0; i < outputs.length; i++) {
            if (outputs[i].isDirty())
                outputs[i].setDirty(false);
            else {
                outputs[i].close();
                stream.removeOutput(outputs[i].name());
            }
        }
    }
}