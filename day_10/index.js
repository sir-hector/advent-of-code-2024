"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8').trim();
var splitted = data.split('\n');
var rowsNumber = splitted.length;
var columnsNumber = splitted[0].length;
// find trailheads - value 0
var trailheadsIndexes = searchIndexes(0);
var score = 0;
// get positions from neighbourhood of (value ++)
// for (let i = 1; i < 10; i++) {
//     const newIndexes = trailheadsIndexes.flatMap(value => searchNextIndexes(value, i));
//     trailheadsIndexes = [];
//     trailheadsIndexes = [...newIndexes];
// }
trailheadsIndexes.forEach(function (value) {
    var trailHeadScore = new Set();
    var indexes = [value];
    var _loop_1 = function (i) {
        indexes = indexes.flatMap(function (value) { return searchNextIndexes(value, i); });
    };
    for (var i = 1; i < 10; i++) {
        _loop_1(i);
    }
    ;
    indexes.forEach(function (value) { return trailHeadScore.add(value); });
    // console.log(indexes)
    console.log("trailHeadScore.size");
    console.log(trailHeadScore.size);
    score += trailHeadScore.size;
});
// if position is 9 count as complete trail
// console.log(trailheadsIndexes.length);
console.log("score");
console.log(score);
function searchIndexes(searchValue) {
    var indexes = [];
    splitted.forEach(function (row, yIndex) {
        row.split('').forEach(function (value, xIndex) {
            if (parseInt(value) === searchValue) {
                indexes.push("".concat(xIndex, "-").concat(yIndex));
            }
        });
    });
    return indexes;
}
function searchNextIndexes(index, searchValue) {
    var indexes = [];
    var splittedIndex = index.split('-');
    var xIndex = parseInt(splittedIndex[0], 10);
    var yIndex = parseInt(splittedIndex[1], 10);
    var neighborDirs = [
        // [-1, -1],
        [0, -1],
        // [1, -1],
        [-1, 0],
        [1, 0],
        // [-1, 1],
        [0, 1],
        // [1, 1]
    ];
    neighborDirs.forEach(function (value) {
        var newXindex = xIndex + value[0];
        var newYindex = yIndex + value[1];
        if (newXindex >= 0 && newYindex >= 0 && newXindex < columnsNumber && newYindex < rowsNumber && parseInt(splitted[newYindex][newXindex]) === searchValue) {
            indexes.push("".concat(newXindex, "-").concat(newYindex));
        }
    });
    return indexes;
}
