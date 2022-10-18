const Sudoku = require('./Sudoku/Sudoku').Sudoku
const SudokuOutcomes = require('./constants/SudokuOutcomes').SudokuOutcomes

class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  validate(sudokuSt) {
    // Your code here

    const sudoku = new Sudoku(sudokuSt)
    const isValid = sudoku.isValid()
    const isComplete = sudoku.isComplete()

    if (isValid) {
      if (isComplete) return SudokuOutcomes.valid
      else return SudokuOutcomes.validIncomplete
    } else {
      return SudokuOutcomes.invalid
    }
  }
}

module.exports = Validator
