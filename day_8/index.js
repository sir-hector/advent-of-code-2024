"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8');
var splitted = data.split('\n');
var antennas = {};
var antinodes = new Set();
var rowsNumber = splitted.length;
var columnsNumber = splitted[0].length;
// read antennas
splitted.forEach(function (value, indexY) {
    // each 
    value.split('').forEach(function (antenna, indexX) {
        if (antenna != '.') {
            if (!antennas[antenna]) {
                antennas[antenna] = [[indexX, indexY]];
            }
            else {
                antennas[antenna] = __spreadArray(__spreadArray([], antennas[antenna], true), [[indexX, indexY]], false);
            }
        }
    });
});
// check antinodes
Object.keys(antennas).forEach(function (antenna) {
    console.log(antenna);
    // iterate through all positions 
    antennas[antenna].forEach(function (item, index) {
        // generate all position for
        for (var i = index + 1; i < antennas[antenna].length; i++) {
            console.log(item + ' ' + antennas[antenna][i]);
            getPossibleAntinodes(item, antennas[antenna][i]);
        }
    });
});
function calculateDistance(pointA, pointB) {
    var dx = (pointA[0]) - (pointB[0]);
    var dy = (pointA[1]) - (pointB[1]);
    return [dx, dy];
}
function getPossibleAntinodes(pointA, pointB) {
    var _a = calculateDistance(pointA, pointB), dx = _a[0], dy = _a[1];
    // first point
    console.log(isPointInRange(pointA, dx, dy));
    // second point
    console.log(isPointInRange(pointB, -dx, -dy));
}
function isPointInRange(point, dx, dy) {
    var newPointX = point[0] + dx;
    var newPointY = point[1] + dy;
    console.log(newPointX);
    console.log(newPointY);
    if (newPointX >= 0 && newPointX < columnsNumber && newPointY >= 0 && newPointY < rowsNumber) {
        antinodes.add("".concat(newPointX, ", ").concat(newPointY));
        return true;
    }
    return false;
}
console.log(antinodes.size);
