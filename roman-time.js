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
var orderedNumbers = [50, 40, 10, 9, 5, 4, 1];
function validate(hours, minutes){ 
	if((hours < 0 || hours > 23)||(minutes < 0 || minutes > 59)||isNaN(hours)||isNaN(minutes)){
		console.error("Error: Invalid arguments!");
	}
	return;
}
function containsDigit(time, digit){
    if ((time/digit) >= 1){
		return true;
	}
	return false;
}

function determineTheOrder(t, n){
	var sequence = [];
	var j = 0;
	for (i = 0; i < n.length; i++){
		while (t >= 0){
			if (containsDigit(t, n[i]) == true){
				sequence[j] = n[i];
				t -= n[i];
				j++;
			}else{
				break;
			}
		}
	}
	return sequence;
}

function renderResult(sequence){
	var result = "";
	for (i=0; i < sequence.length; i++){
		result += arabicToRomanTable[sequence[i]];
	}
	return result;
}

function convertTimeToRoman(time, orderedNumbers){
	if (time == 0){
		return '--';
	}else{
		var orderOfDigits = determineTheOrder(time, orderedNumbers);
		return renderResult(orderOfDigits);
	}	
}

validate (hours, minutes);
console.log(convertTimeToRoman(hours, orderedNumbers) + ' : ' + convertTimeToRoman(minutes, orderedNumbers));

