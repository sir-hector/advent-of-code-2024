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
    var condition = isSorted(sequence);
    if (condition) {
        sum += parseInt((sequenceItems[Math.floor(sequenceItems.length / 2)]));
    }
    else {
        // PART 2 prepare mapping that has only values from sequence items
        var dictionary_1 = {};
        var ordered = [];
        sequenceItems.forEach(function (value) {
            dictionary_1[value] = rules.filter(function (rule) { return rule[0] === value; }).map(function (rule) { return rule[1]; }).filter(function (rule) { return sequenceItems.includes(rule); });
        });
        var _loop_1 = function () {
            // find the key with empty array
            var emptyKey = Object.keys(dictionary_1).find(function (key) { return dictionary_1[key].length === 0; });
            //remove the key from all avalues
            for (var key in dictionary_1) {
                dictionary_1[key] = dictionary_1[key].filter(function (item) { return item !== emptyKey; });
            }
            if (emptyKey) {
                delete dictionary_1[emptyKey];
                ordered.unshift(emptyKey);
            }
        };
        while (Object.keys(dictionary_1).length) {
            _loop_1();
        }
        console.log(ordered);
        console.log((ordered[Math.floor(ordered.length / 2)]));
        sum2 += parseInt((ordered[Math.floor(ordered.length / 2)]));
    }
});
console.log(sum);
console.log(sum2);
function isSorted(sequence) {
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
    return condition;
}
