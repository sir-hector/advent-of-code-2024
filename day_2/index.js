"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8');
var splitted = data.split('\n');
var result = 0;
splitted.forEach(function (value) {
    var splittedValue = value.split(" ");
    if (isSafeReport(splittedValue)) {
        result++;
    }
    else {
        var isSafeAfterRemoval = false;
        for (var i = 0; i < splittedValue.length; i++) {
            var modifiedReport = splittedValue.slice(0, i).concat(splittedValue.slice(i + 1));
            if (isSafeReport(modifiedReport)) {
                isSafeAfterRemoval = true;
                break;
            }
        }
        if (isSafeAfterRemoval) {
            result++;
        }
    }
});
function isSafeReport(report) {
    var isDecreasing = true;
    var isIncreasing = true;
    // Check decreasing
    for (var i = 1; i < report.length; i++) {
        var diff = parseInt(report[i - 1]) - parseInt(report[i]);
        if (diff < 1 || diff > 3) {
            isDecreasing = false;
        }
        if (parseInt(report[i - 1]) <= parseInt(report[i])) {
            isDecreasing = false;
        }
    }
    // Check increasing
    for (var i = 1; i < report.length; i++) {
        var diff = parseInt(report[i]) - parseInt(report[i - 1]);
        if (diff < 1 || diff > 3) {
            isIncreasing = false;
        }
        if (parseInt(report[i]) <= parseInt(report[i - 1])) {
            isIncreasing = false;
        }
    }
    return isDecreasing || isIncreasing;
}
console.log(result);
