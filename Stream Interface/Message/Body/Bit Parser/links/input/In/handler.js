function handler(In) {
    this.assertProperty(In, 'value');
    var bit_startpos = this.props["bit_startpos"];
    var properties = this.props["properties"];
    var bit_length = this.props["bit_length"];
    var input_bits = this.props["input_bits"];

    //process variables
    var testdata_bitstr;
    var temp;
    var bit_filler;
    var upper = 16;
    var lower = 0;
    var extr_bits = [];

    //Int to bit string with desired length
    var int_val = In.property("value").value().toInteger();
    temp = int_val.toString(2);                                      //Message input needs to be developed how to get a bit string
    if(temp.length < input_bits){
        bit_filler = input_bits - temp.length;
        for(var j = 0; j<bit_filler; j++){
            temp = '0'+temp
        }
    }
    testdata_bitstr = temp;

    //Assign bits
    for(var i = 0; i<bit_startpos.length; i++){
        if(bit_length[i] > 1){
            lower = bit_startpos[i];
            upper = Number(bit_startpos[i])+Number(bit_length[i]);
            temp = testdata_bitstr.slice(lower, upper);
            temp = getInt(temp);
            extr_bits.push(temp);
        }else{
            temp = testdata_bitstr[bit_startpos[i]];
            temp = getBoolean(temp);
            extr_bits.push(temp);
        }
        In.property(properties[i]).set(extr_bits[i]);
    }

    //Generate outputs
    this.executeOutputLink("Out", In);

    //Functions to convert bits into desired data type
    function getBoolean(value){
        return value === "1" || value === 1;
    }

    function getInt(x) {
        this.INTEGER = Java.type("java.lang.Integer");
        var parsed;
        parsed = this.INTEGER.parseInt(x, 2);
        if (isNaN(parsed)) { return 0 }
        return parsed;
    }
}