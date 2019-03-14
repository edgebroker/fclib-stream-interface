function handler(In) {
    this.executeOutputLink("Memory", this.getInputReference("Left")().join(this.getInputReference("Right")(), this.props["leftjoinprop"], this.props["rightjoinprop"]));
}