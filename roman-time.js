'use strict'; 
var hours = process.argv[2];
var minutes = process.argv[3];

var arabicToRomanTable = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X', 
    40: 'XL',
    50: 'L'
};
var orderedArabicNumbers = [50, 40, 10, 9, 5, 4, 1];

var asciiLetters = {
    "I":[5, 2, 2, 2, 5],
    "X":[4, 3, 2, 3, 4],
    "L":[1, 1, 1, 1, 5],
    "V":[4, 4, 4, 3, 2],
    ":":[2, 2, 0, 2, 2],
    "-":[0, 0, 5, 0, 0]
};
var asciiStrings = ['      ', '#     ', '  ##  ', ' #  # ', '#    #', '######'];

function validate(hours, minutes) {
    if(hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || isNaN(hours) || isNaN(minutes)) {
        console.error("Error: Invalid arguments!");
        return false;
    }
    return true;
}

function containsDigit(time, digit) {
    return (time/digit) >= 1;
}

function determineTheOrder(arabicToConvert, orderedNumbers){
    var orderOfRomanDigits = [];
    var j = 0;
    for (var i = 0; i < orderedNumbers.length; i++){
        while (arabicToConvert >= 0){
            if (containsDigit(arabicToConvert, orderedNumbers[i]) == true){
                orderOfRomanDigits[j] = orderedNumbers[i];
                arabicToConvert -= orderedNumbers[i];
                j++;
            } else {
                break;
            }
        }
    }
    return orderOfRomanDigits;
}

function renderResult(orderOfRoman){
    var result = "";
    for (var i = 0; i < orderOfRoman.length; i++) {
        result += arabicToRomanTable[orderOfRoman[i]];
    }
    return result;
}

function convertTimeToRoman(time, orderedNumbers) {
    if (time == 0) {
        return '--';
    } else {
        var orderOfDigits = determineTheOrder(time, orderedNumbers);
        return renderResult(orderOfDigits);
    }
}

function romanTimeToAscii(romanTime) {
    var symbolsArray = romanTime.split('');
    var output = '\n';
    for(var j = 0; j < 5; j++) {
        for(var i = 0; i < symbolsArray.length; i++) {
            output += asciiStrings[asciiLetters[symbolsArray[i]][j]];
            output += ' ';
        }
        output += '\n';
    }
    return output;
}

if (validate (hours, minutes)) {
    var romanTime = convertTimeToRoman(hours, orderedArabicNumbers) + ':' + convertTimeToRoman(minutes, orderedArabicNumbers);
    console.log(romanTimeToAscii(romanTime));
}
