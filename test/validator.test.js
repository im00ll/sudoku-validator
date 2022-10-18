const Validator = require('../src/validator')
const fs = require('fs').promises

describe('valid sudoku', () => {
  test('recognizes a complete sudoku', async () => {
    const sudoku = await fs.readFile(__dirname + '/fixtures/valid_complete.sudoku')

    expect(Validator.validate(sudoku.toString())).toBe('Sudoku is valid.')
  })

  test('recognizes an incomplete sudoku', async () => {
    const sudoku = await fs.readFile(__dirname + '/fixtures/valid_incomplete.sudoku')

    // Edit notes:
    // Changed 'Sudoku is valid.' to 'Sudoku is valid but incomplete.',
    // because we want to recognize an incomplete sudoku and test is called "incomplete".
    expect(Validator.validate(sudoku.toString())).toBe('Sudoku is valid but incomplete.')
  })
})

describe('invalid sudoku', () => {
  [
    __dirname + '/fixtures/invalid_due_to_row_dupe.sudoku',
    __dirname + '/fixtures/invalid_due_to_column_dupe.sudoku',
    __dirname + '/fixtures/invalid_due_to_subgroup_dupe.sudoku'
  ].forEach(path => {
    test('recognizes invalid sudoku', async () => {
      const sudoku = await fs.readFile(path)

      expect(Validator.validate(sudoku.toString())).toBe('Sudoku is invalid.')
    })
  })
})
