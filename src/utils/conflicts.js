import { isValid } from './validator';

/**
 * DSA: Returns a Set of "r-c" keys that have conflicts.
 * Temporarily zeros each cell then calls isValid to detect duplicates.
 */
export function getConflicts(board) {
  const conflicts = new Set();

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const value = board[r][c];

      if (!value) continue;

      board[r][c] = 0;

      if (!isValid(board, r, c, value)) {
        conflicts.add(`${r}-${c}`);
      }

      board[r][c] = value;
    }
  }

  return conflicts;
}
