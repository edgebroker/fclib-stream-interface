function handler(In) {
    for (var i = 0; i < this.props["properties"].length; i++) {
        if (In[this.props["properties"][i]]){
            this.executeOutputLink(this.props["properties"][i], In);
        }
    }
}