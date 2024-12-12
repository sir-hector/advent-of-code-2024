"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8');
var splitted = data.split('\n');
var sum1 = 0;
splitted.forEach(function (value) {
    var splitValue = value.split(":");
    var result = parseInt(splitValue[0]);
    var items = splitValue[1].split(" ");
    items.shift();
    var combinations = generatePossibleOperationPart2(items.length - 1);
    console.log(combinations);
    combinations.some(function (operators) {
        var currentResult = parseInt(items[0]);
        for (var i = 0; i < operators.length; i++) {
            var nextNumber = items[i + 1];
            if (operators[i] === '+') {
                currentResult += parseInt(nextNumber);
            }
            else if (operators[i] === '*') {
                currentResult *= parseInt(nextNumber);
            }
            else if (operators[i] === '/') {
                currentResult = parseInt("".concat(currentResult).concat(nextNumber));
            }
        }
        if (currentResult === result) {
            sum1 += result;
            return true;
        }
    });
});
// generate possible operators
function generatePossibleOperation(length) {
    var combinations = [];
    var totalCombination = 1 << length;
    for (var i = 0; i < totalCombination; i++) {
        var currentCombination = '';
        for (var bit = 0; bit < length; bit++) {
            // check if in number i at current possition (bit) is 1 or 0
            currentCombination += (i & (1 << bit)) ? '*' : '+';
        }
        combinations.push(currentCombination);
    }
    return combinations;
}
// part 2 
function generatePossibleOperationPart2(length) {
    var combinations = [];
    var totalCombination = Math.pow(3, length);
    for (var i = 0; i < totalCombination; i++) {
        var currentCombination = '';
        var n = i;
        for (var bit = 0; bit < length; bit++) {
            var operatorType = n % 3;
            currentCombination += operatorType === 0 ? '+' : operatorType === 1 ? '*' : '/';
            n = Math.floor(n / 3);
        }
        combinations.push(currentCombination);
    }
    return combinations;
}
console.log(sum1);
