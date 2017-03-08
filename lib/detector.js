'use strict';
// need a little optimization 
var consonant = Array("b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z");
var vowel = Array("a","e","i","o","u","y");
var number = Array("0","1","2","3","4","5","6","7","8","9");
var dbl = Array( "aj", "aq","av", "az","cy", "dy", "eh","ek", "fy", "gy", "ib", "if","ih","ii","ij","ik","iq","iu","iv","iw","ix", "iy", "jy", "ko","ku", "ky","oc", "og","oh", "oj","ok", "oq", "ov", "oy", "oz", "qa","qi","qo","qy", "sy","uc", "uf","ug", "uh", "uj", "uk", "uq", "uu", "uv", "uw", "ux", "uy", "uz", "vu", "vy", "wu", "wy", "xa", "xi", "xu","xy","yb", "yc","yd", "yf","yg", "yh", "yi", "yj", "yk", "ym", "yp","yq", "yr", "yt","yv","yw","yx","yy","yz");
var whitelist = Array("cpl","srx","tkt","pbm","slp","ch");     

var regex = null;
var regexwl = null;

function makeRegex(tab)
{
    var strregex = "(";
    for(var i = 0;i<tab.length;i++)
    {
        if(i==0)
            strregex += tab[i];
        else
            strregex += "|"+tab[i];
    }
    strregex += ")";

    return new RegExp(strregex,"gi");
}
Array.prototype.unique = function()
{
    var n = {},r=[];
    for(var i = 0; i < this.length; i++) 
    {
        if (!n[this[i]]) 
        {
            n[this[i]] = true; 
            r.push(this[i]); 
        }
    }
    return r;
}

for(var i = 0;i<consonant.length;i++)
{
    for(var j=0;j<consonant.length;j++)
    {
        dbl.push(consonant[i]+""+consonant[j]);
    }
}

for(var i = 0;i<vowel.length;i++)
{
    for(var j=0;j<vowel.length;j++)
    {
        dbl.push(vowel[i]+""+vowel[j]);
    }
}

for(var i = 0;i<number.length;i++)
{
    for(var j=0;j<number.length;j++)
    {
        dbl.push(number[i]+""+number[j]);
    }
}


regex = makeRegex(dbl);
regexwl = makeRegex(whitelist);


exports.detector = function detector(str,options)
{
    var defaults = { min: 5};
    var settings = defaults;
    if (typeof options === 'object') {
        if(isNumber(options.min))
        {
            if(options.min >= 0)
            {
                settings.min = options.min;
            }
        }
    }

    if(str.length < settings.min)
        return false;

    var score = 0;
    var result;

    console.log("on detecte");
    var tab = str.match(/([a-zA-Z\-]{2})(?=(.*?\1){2})/g);

    if(Array.isArray(tab))
    {
        tab = tab.unique();

        var tmpregex = makeRegex(tab);
        console.log(tmpregex);
        while ( (result = tmpregex.exec(str)) ) {
            score++;
        }
    }
    
    var duplet ="";
    //todo need a better regex 
    for(var i = 0;i<str.length-1;i++)
    {
        duplet = str.substr(i,2);
        while ( (result = regex.exec(duplet)) ) {
            score++;
        }
    }
    
    while ( (result = regexwl.exec(str)) ) {
        if(result[0].length == 3)
            score = score - 2;
        else if(result[0].length == 2)
            score--;
    }

    return (score / (str.length-1));

}