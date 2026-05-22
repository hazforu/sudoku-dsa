import { isValid } from './validator';

/**
 * DSA: Backtracking solver.
 * Mutates board in-place. Returns true if solved.
 * Time: O(9^m) where m = empty cells. Space: O(m) call stack.
 */
export function solve(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        for (let n = 1; n <= 9; n++) {
          if (isValid(board, r, c, n)) {
            board[r][c] = n;
            if (solve(board)) return true;
            board[r][c] = 0; // backtrack
          }
        }
        return false;
      }
    }
  }
  return true; // all cells filled
}

/**
 * DSA: Collects every placement & backtrack step for animation.
 * Returns array of { r, c, n, type: 'place' | 'backtrack' }
 */
export function solveWithSteps(initial) {
  const board = initial.map((row) => [...row]);
  const steps = [];

  function bt() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          for (let n = 1; n <= 9; n++) {
            if (isValid(board, r, c, n)) {
              board[r][c] = n;
              steps.push({ r, c, n, type: 'place' });
              if (bt()) return true;
              board[r][c] = 0;
              steps.push({ r, c, n: 0, type: 'backtrack' });
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  bt();
  return steps;
}
