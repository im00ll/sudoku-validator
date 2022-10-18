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
exports.__esModule = true;
exports.Sudoku = void 0;
var Sudoku = /** @class */ (function () {
    function Sudoku(sudoku) {
        this._startIdxMap = [
            [0, 0], [0, 3], [0, 6],
            [3, 0], [3, 3], [3, 6],
            [6, 0], [6, 3], [6, 6],
        ];
        this.sudoku = sudoku;
        this._sudokuRowStrings = sudoku.split('\n');
        this._rows = this._getRows();
        this._columns = this._getColumns();
        this._squares = this._getSquares();
    }
    /**
     * Determines whether the state of the sudoku puzzle is valid.
     */
    Sudoku.prototype.isValid = function () {
        var _a;
        var isNumberAmtsValid = function (numberAmounts) {
            for (var _i = 0, _a = Object.values(numberAmounts); _i < _a.length; _i++) {
                var num = _a[_i];
                if (num > 1)
                    return false;
            }
            return true;
        };
        // Validates rows, columns, and squares
        for (var _i = 0, _b = __spreadArray(__spreadArray(__spreadArray([], this._rows, true), this._columns, true), this._squares, true); _i < _b.length; _i++) {
            var nums = _b[_i];
            // Going to keep track of number amounts in row/col, then validate
            var numberAmounts = {};
            for (var _c = 0, nums_1 = nums; _c < nums_1.length; _c++) {
                var num = nums_1[_c];
                // Do not keep track of zeros, "the empty cell" num
                if (num == 0)
                    continue;
                numberAmounts[num] = ((_a = numberAmounts[num]) !== null && _a !== void 0 ? _a : 0) + 1;
            }
            var valid = isNumberAmtsValid(numberAmounts);
            if (!valid)
                return false;
        }
        return true;
    };
    /**
     * Determines whether the sudoku puzzle is complete.
     */
    Sudoku.prototype.isComplete = function () {
        var isComplete = true;
        // If find any zeros, then has been determined to be incomplete.
        for (var _i = 0, _a = this._rows; _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var num = row_1[_b];
                if (num == 0) {
                    isComplete = false;
                    break;
                }
            }
        }
        return isComplete;
    };
    /**
     * Extracts rows of numbers from sudoku puzzle string.
     */
    Sudoku.prototype._getRows = function () {
        var product = [];
        for (var _i = 0, _a = this._sudokuRowStrings; _i < _a.length; _i++) {
            var rowSt = _a[_i];
            var row = [];
            for (var i = 0; i < rowSt.length; ++i) {
                var char = rowSt.charAt(i);
                var num = this._parsePuzzleChar(char);
                if (num == null)
                    continue;
                row.push(num);
            }
            if (row.length > 0)
                product.push(row);
        }
        return product;
    };
    /**
     * Extracts columns of numbers from sudoku puzzle string.
     */
    Sudoku.prototype._getColumns = function () {
        var product = [];
        for (var colIdx = 0; colIdx < 19; ++colIdx) {
            var column = [];
            for (var _i = 0, _a = this._sudokuRowStrings; _i < _a.length; _i++) {
                var rowSt = _a[_i];
                var char = rowSt.charAt(colIdx);
                var num = this._parsePuzzleChar(char);
                if (num == null)
                    continue;
                column.push(num);
            }
            if (column.length > 0)
                product.push(column);
        }
        return product;
    };
    /**
     * Extracts squares of numbers from sudoku puzzle string.
     */
    Sudoku.prototype._getSquares = function () {
        var _this = this;
        return this._startIdxMap.map(function (_a) {
            var rowStartIdx = _a[0], colStartIdx = _a[1];
            return _this._getSquare(rowStartIdx, colStartIdx);
        });
    };
    Sudoku.prototype._getSquare = function (rowStartIdx, colStartIdx) {
        if (rowStartIdx % 3 != 0)
            throw 'rowStartIdx wrong in _getSquare()';
        if (colStartIdx % 3 != 0)
            throw 'colStartIdx wrong in _getSquare()';
        var rowEndIdx = rowStartIdx + 3;
        var colEndIdx = colStartIdx + 3;
        var square = [];
        for (var rowIdx = rowStartIdx; rowIdx < rowEndIdx; ++rowIdx) {
            var row = this._rows[rowIdx];
            square.push.apply(square, row.slice(colStartIdx, colEndIdx));
        }
        return square;
    };
    Sudoku.prototype._parsePuzzleChar = function (char) {
        var ignoredChars = ['', ' ', '|', '\r', '-', '+'];
        // Ignore certain chars
        if (ignoredChars.includes(char))
            return null;
        var num = Number(char);
        if (typeof num != 'number' || isNaN(num))
            return null;
        return num;
    };
    return Sudoku;
}());
exports.Sudoku = Sudoku;
