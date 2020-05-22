function handler(In) {
    this.properties = this.props['properties'];

    if (In.type() !== "text") {
        throw "Incoming message is not a text message";
    }

    var json_bod = JSON.parse(In.body());

    //Main functionality
    In.property("props").set(this.properties.length);
    for(var i = 0; i<this.properties.length; i++){
        //Properties provided from the user input!
        var json_field = this.properties[i]["json_field"];
        var prop_name = this.properties[i]["prop_name"];
        var data_type = this.properties[i]["type"];
        var start_bit = this.properties[i]["bit_startpos"];
        var length = this.properties[i]["bit_length"];

        var temp = "";
        var result;
        var s;
        var hexnum;
        var hex_length;

        if(json_bod[json_field]) {
            switch (data_type) {
                case "boolean":
                    temp = "";
                    for (s = json_bod[json_field]["Value"].length - 1; s >= 0; s--) {
                        temp = temp + json_bod[json_field]["Value"][s].toString();
                    }
                    temp = temp[start_bit];
                    result = Number(temp);
                    In.property(prop_name).set(result);
                    break;
                case "float (little endian)":
                    temp = "";
                    for (s = start_bit; s < length; s++) {
                        temp = temp + json_bod[json_field]["Value"][s].toString();
                    }
                    if (temp.length < length) {
                        temp = '0' + temp;
                    }
                    hexnum = parseInt(temp, 2).toString(16);
                    hex_length = (length / 8) * 2;
                    while (hexnum.length < hex_length) {
                        hexnum = "0" + hexnum;
                    }
                    hexnum = "0x" + hexnum;
                    result = hexToFloat(flipHexString(hexnum, length));
                    In.property(prop_name).set(result * 1000);
                    break;
                case "float (big endian)":
                    temp = "";
                    for (s = start_bit; s < length; s++) {
                        temp = temp + json_bod[json_field]["Value"][s].toString();
                    }
                    if (temp.length < length) {
                        temp = '0' + temp;
                    }
                    hexnum = parseInt(temp, 2).toString(16);
                    hex_length = (length / 8) * 2;
                    while (hexnum.length < hex_length) {
                        hexnum = "0" + hexnum;
                    }
                    hexnum = "0x" + hexnum;
                    result = hexToFloat(hexnum);
                    In.property(prop_name).set(result * 1000);
                    break;
                case "UINT":
                    temp = "";
                    for (s = start_bit; s < length; s++) {
                        temp = temp + json_bod[json_field]["Value"][s].toString();
                    }
                    result = convertInt(temp);
                    In.property(prop_names).set(result);
                    break;
                case "SINT":
                    temp = "";
                    for (s = start_bit; s < length; s++) {
                        temp = temp + json_bod[json_field]["Value"][s].toString();
                    }
                    var int_res = convertInt(temp);
                    var sint_res = uintToInt(int_res, length);
                    In.property(prop_name).set(sint_res);
                    break;
            }
        }


    }

    this.executeOutputLink("Out", In);

    //Conversion Functions
    function convertBool(x){
        return x === "1" || x === 1;
    }

    function flipHexString(hexValue, hexDigits) {
        var h = hexValue.substr(0, 2);
        for (var i = 0; i < hexDigits; ++i) {
            h += hexValue.substr(2 + (hexDigits - 1 - i) * 2, 2);
        }
        return h;
    }


    function hexToFloat(hex) {
        var s = hex >> 31 ? -1 : 1;
        var e = (hex >> 23) & 0xFF;
        return s * (hex & 0x7fffff | 0x800000) * 1.0 / Math.pow(2, 23) * Math.pow(2, (e - 127))
    }


    function convertInt(x){
        return parseInt( x, 2);
    }

    function uintToInt(uint, nbit) {
        nbit = +nbit || 32;
        if (nbit > 32) throw new RangeError('uintToInt only supports ints up to 32 bits');
        uint <<= 32 - nbit;
        uint >>= 32 - nbit;
        return uint;
    }
}
