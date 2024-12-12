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
console.log(visitedPositions.size);
// direction dx, dy
function turnRight(dx, dy) {
    return [-dy, dx];
}
// part 2
// reset cursor position
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
var loopCausingPositions = 0;
visitedPositions.forEach(function (position) {
    var _a = position.split(',').map(Number), obstructionX = _a[0], obstructionY = _a[1];
    if (obstructionX === cursorXPosition && obstructionY === cursorYPosition) {
        return;
    }
    console.log(causesLoop(obstructionX, obstructionY));
    if (causesLoop(obstructionX, obstructionY)) {
        loopCausingPositions++;
    }
});
console.log(loopCausingPositions);
function causesLoop(obstructionX, obstructionY) {
    var _a;
    var guardX = cursorXPosition;
    var guardY = cursorYPosition;
    var dirX = 0;
    var dirY = -1;
    var seenStates = new Set();
    while (true) {
        if (guardX >= columnsNumber || guardX < 0 || guardY >= rowsNumber || guardY < 0) {
            return false;
        }
        if ((guardX === obstructionX && guardY === obstructionY) ||
            splitted[guardY][guardX] === OBSTRUCTION_SYMBOL) {
            guardX -= dirX;
            guardY -= dirY;
            _a = turnRight(dirX, dirY), dirX = _a[0], dirY = _a[1];
        }
        else {
            var state = "".concat(guardX, ",").concat(guardY, ",").concat(dirX, ",").concat(dirY);
            if (seenStates.has(state)) {
                return true;
            }
            seenStates.add(state);
            guardX += dirX;
            guardY += dirY;
        }
    }
}
