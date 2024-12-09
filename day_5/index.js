"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8');
var splitted = data.split('\n\n');
var rules = splitted[0].split('\n');
var sequences = splitted[1].split('\n');
// prapare full map
var rullesMap = {};
rules.map(function (rule) {
    var ruleSplitted = rule.split('|');
    if (rullesMap[ruleSplitted[0]]) {
        rullesMap[ruleSplitted[0]].push(ruleSplitted[1]);
    }
    else {
        rullesMap[ruleSplitted[0]] = [ruleSplitted[1]];
    }
});
var sum = 0;
var sum2 = 0;
// iterate through updates
sequences.forEach(function (sequence) {
    var sequenceItems = sequence.split(',');
    var condition = true;
    sequenceItems.some(function (value, index) {
        // get values from mapper.
        var values = rullesMap[value] ? rullesMap[value] : [];
        // get rest of string -- only right
        var restOfValues = sequenceItems.slice(index + 1, sequenceItems.length);
        // check if rest has all required values -- only right
        restOfValues.some(function (value) {
            if (values.includes(value)) {
                condition = true;
            }
            else {
                condition = false;
                return true;
            }
        });
        return !condition;
    });
    if (condition) {
        sum += parseInt((sequenceItems[Math.floor(sequenceItems.length / 2)]));
    }
    else {
        var sorted = sequenceItems.sort(function (a, b) {
            if (a < b) {
                return -1;
            }
            return 1;
        });
        var condition2 = true;
        console.log(sorted);
        console.log((sorted[Math.floor(sorted.length / 2)]));
        sum2 += parseInt((sorted[Math.floor(sorted.length / 2)]));
        // sorted.some((value, index) => {
        //     // get values from mapper.
        //     const values = rullesMap[value] ? rullesMap[value] : []
        //     // get rest of string -- only right
        //     const restOfValues = sorted.slice(index + 1, sorted.length)
        //     // check if rest has all required values -- only right
        //     restOfValues.some(value => {
        //         if (values.includes(value)) {
        //             condition2 = true;
        //         } else {
        //             condition2 = false;
        //             return true;
        //         }
        //     })
        //     return !condition2
        // })
        // if (!condition2) {
        //     sum2 += parseInt((sorted[Math.floor(sorted.length / 2)]))
        // }
    }
});
console.log(sum);
console.log(sum2);
