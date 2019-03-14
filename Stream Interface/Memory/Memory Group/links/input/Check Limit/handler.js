function handler(timer) {
    stream.memoryGroup(this.compid).checkLimit();
}