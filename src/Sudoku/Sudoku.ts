export class Sudoku {
  _startIdxMap: number[][] = [
    [0, 0], [0, 3], [0, 6],
    [3, 0], [3, 3], [3, 6],
    [6, 0], [6, 3], [6, 6],
  ]

  sudoku: string
  _sudokuRowStrings: string[]
  _rows: number[][]
  _columns: number[][]
  _squares: number[][]

  constructor(
    sudoku: string,
  ) {
    this.sudoku = sudoku
    this._sudokuRowStrings = sudoku.split('\n')

    this._rows = this._getRows()
    this._columns = this._getColumns()
    this._squares = this._getSquares()
  }

  /**
   * Determines whether the state of the sudoku puzzle is valid.
   */
  isValid(): boolean {
    const isNumberAmtsValid = (
      numberAmounts: {[k: string]: number},
    ): boolean => {
      for (const num of Object.values(numberAmounts)) {
        if (num > 1) return false
      }
      return true
    }

    // Validates rows, columns, and squares
    for (const nums of [
      ...this._rows,
      ...this._columns,
      ...this._squares,
    ]) {
      // Going to keep track of number amounts in row/col, then validate
      const numberAmounts: {[k: string]: number} = {}

      for (const num of nums) {
        // Do not keep track of zeros, "the empty cell" num
        if (num == 0) continue
        
        numberAmounts[num] = (numberAmounts[num] ?? 0) + 1
      }

      const valid = isNumberAmtsValid(numberAmounts)
      if (!valid) return false
    }

    return true
  }

  /**
   * Determines whether the sudoku puzzle is complete.
   */
  isComplete(): boolean {
    let isComplete = true

    // If find any zeros, then has been determined to be incomplete.
    for (const row of this._rows) {
      for (const num of row) {
        if (num == 0) {
          isComplete = false
          break
        }
      }
    }

    return isComplete
  }

  /**
   * Extracts rows of numbers from sudoku puzzle string.
   */
  _getRows(): number[][] {
    const product: number[][] = []

    for (const rowSt of this._sudokuRowStrings) {
      const row: number[] = []
      for (let i = 0; i < rowSt.length; ++i) {
        const char = rowSt.charAt(i)
        const num = this._parsePuzzleChar(char)

        if (num == null) continue

        row.push(num)
      }

      if (row.length > 0) product.push(row)
    }

    return product
  }

  /**
   * Extracts columns of numbers from sudoku puzzle string.
   */
  _getColumns(): number[][] {
    const product: number[][] = []

    for (let colIdx = 0; colIdx < 19; ++colIdx) {
      const column: number[] = []

      for (const rowSt of this._sudokuRowStrings) {
        const char = rowSt.charAt(colIdx)
        const num = this._parsePuzzleChar(char)

        if (num == null) continue

        column.push(num)
      }

      if (column.length > 0) product.push(column)
    }
    
    return product
  }

  /**
   * Extracts squares of numbers from sudoku puzzle string.
   */
  _getSquares(): number[][] {
    return this._startIdxMap.map(([
      rowStartIdx,
      colStartIdx,
    ]) => this._getSquare(rowStartIdx, colStartIdx))
  }

  _getSquare(
    rowStartIdx: number,
    colStartIdx: number,
  ): number[] {
    if (rowStartIdx % 3 != 0) throw 'rowStartIdx wrong in _getSquare()'
    if (colStartIdx % 3 != 0) throw 'colStartIdx wrong in _getSquare()'
    const rowEndIdx = rowStartIdx + 3
    const colEndIdx = colStartIdx + 3

    const square: number[] = []

    for (let rowIdx = rowStartIdx; rowIdx < rowEndIdx; ++rowIdx) {
      const row = this._rows[rowIdx]
      square.push(...row.slice(colStartIdx, colEndIdx))
    }

    return square
  }

  _parsePuzzleChar(
    char: string,
  ): number | null {
    const ignoredChars = ['', ' ', '|', '\r', '-', '+']

    // Ignore certain chars
    if (ignoredChars.includes(char)) return null
    
    let num = Number(char)
    if (typeof num != 'number' || isNaN(num)) return null

    return num
  }
}
