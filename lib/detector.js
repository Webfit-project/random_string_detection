'use strict';

var consonant = Array("b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z");
var vowel = Array("a","e","i","o","u","y");
var number = Array("0","1","2","3","4","5","6","7","8","9");
var dbl = Array();
var regex = null;
var strregex = "(";

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


for(var i = 0;i<dbl.length;i++)
{
    if(i==0)
        strregex += dbl[i];
    else
        strregex += "|"+dbl[i];
}
strregex += ")";

regex =  new RegExp(strregex,"gi");


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
    while ( (result = regex.exec(str)) ) {
        score++;
    }

    return (score / (str.length-1));

}