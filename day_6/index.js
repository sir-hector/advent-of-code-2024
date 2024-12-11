"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8');
var splitted = data.split('\n');
var rowsNumber = splitted.length;
var columnsNumber = splitted[0].length;
var cursorXPosition = 0;
var cursorYPosition = 0;
// base direction(up)
var dx = 0;
var dy = -1;
var CURSOR_SYMBOL = '^';
var OBSTRUCTION_SYMBOL = '#';
splitted.some(function (value, rowIndex) {
    var found = false;
    value.split('').some(function (value, index) {
        if (value === CURSOR_SYMBOL) {
            cursorYPosition = rowIndex;
            cursorXPosition = index;
            found = true;
            return found;
        }
    });
    return found;
});
var found = true;
var visitedPositions = new Set();
while (found) {
    if (cursorXPosition >= columnsNumber || cursorXPosition < 0 || cursorYPosition >= rowsNumber || cursorYPosition < 0) {
        found = false;
        break;
    }
    console.log(splitted[cursorXPosition][cursorYPosition]);
    if (splitted[cursorYPosition][cursorXPosition] === OBSTRUCTION_SYMBOL) {
        cursorXPosition -= dx;
        cursorYPosition -= dy;
        var _a = turnRight(dx, dy), newDx = _a[0], newDy = _a[1];
        dx = newDx;
        dy = newDy;
    }
    else {
        visitedPositions.add("".concat(cursorXPosition, ",").concat(cursorYPosition));
        cursorXPosition += dx;
        cursorYPosition += dy;
    }
}
console.log(splitted);
console.log(visitedPositions.size);
// direction dx, dy
function turnRight(dx, dy) {
    return [-dy, dx];
}
