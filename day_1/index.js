"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8');
var splitted = data.split('\n');
// result
var sum = 0;
var leftPart = [];
var rightPart = [];
splitted.forEach(function (row) {
    // split row
    var splittedRow = row.split('   ');
    // left part
    leftPart.push(parseInt(splittedRow[0]));
    rightPart.push(parseInt(splittedRow[1]));
});
// sort arrays
leftPart.sort(function (a, b) {
    return a - b;
});
rightPart.sort(function (a, b) {
    return a - b;
});
// calculate difference
leftPart.forEach(function (value, index) {
    var difference = Math.abs(value - rightPart[index]);
    sum = sum + difference;
});
console.log(sum);
