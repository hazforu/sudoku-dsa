/**
 * DSA: Check if placing `num` at (row,col) is valid.
 * Scans row, col, and 3x3 box — O(1) since always 9 cells.
 */
export function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
    const br = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const bc = 3 * Math.floor(col / 3) + (i % 3);
    if (board[br][bc] === num) return false;
  }
  return true;
}

export function isBoardComplete(board) {
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++)
      if (!board[r][c]) return false;
  return true;
}
