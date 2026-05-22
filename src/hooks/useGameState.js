import { useState, useCallback, useEffect } from 'react';
import { getPuzzle } from '../utils/puzzles';
import { getConflicts } from '../utils/conflicts';
import { isValid, isBoardComplete } from '../utils/validator';
import { solve, solveWithSteps } from '../utils/solver';

const makeNotes = () =>
  Array(9)
    .fill(null)
    .map(() => Array(9).fill(null).map(() => new Set()));

export function useGameState() {
  const [difficulty, setDifficulty] = useState('easy');
  const [board, setBoard] = useState(() => getPuzzle('easy'));
  const [initial, setInitial] = useState(() => getPuzzle('easy'));
  const [selected, setSelected] = useState(null);
  const [conflicts, setConflicts] = useState(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [won, setWon] = useState(false);
  const [solving, setSolving] = useState(false);
  const [solveCell, setSolveCell] = useState(null);
  const [autoSolved, setAutoSolved] = useState(false);
  const [noteMode, setNoteMode] = useState(false);
  const [notes, setNotes] = useState(makeNotes);
  const [timerActive, setTimerActive] = useState(true);

  // Load a fresh puzzle
  const loadPuzzle = useCallback((diff) => {
    const p = getPuzzle(diff);
    setBoard(p);
    setInitial(p.map((r) => [...r]));
    setSelected(null);
    setConflicts(new Set());
    setMistakes(0);
    setWon(false);
    setSolving(false);
    setSolveCell(null);
    setAutoSolved(false);
    setNoteMode(false);
    setNotes(makeNotes());
    setTimerActive(true);
  }, []);

  const newGame = useCallback(
    (diff = difficulty) => {
      setDifficulty(diff);
      loadPuzzle(diff);
    },
    [difficulty, loadPuzzle]
  );

  // Input a number into selected cell
  const inputNumber = useCallback(
    (num) => {
      if (!selected || solving || won) return;
      const [r, c] = selected;
      if (initial[r][c] !== 0) return;

      // Notes mode
      if (noteMode && num !== 0) {
        const next = notes.map((row) => row.map((cell) => new Set(cell)));
        if (next[r][c].has(num)) next[r][c].delete(num);
        else next[r][c].add(num);
        setNotes(next);
        return;
      }

      const nextBoard = board.map((row) => [...row]);
      nextBoard[r][c] = num;

      // Count mistake: placement is wrong if isValid fails
      if (num !== 0) {
        const tmp = nextBoard.map((row) => [...row]);
        tmp[r][c] = 0;
        if (!isValid(tmp, r, c, num)) setMistakes((m) => m + 1);
      }

      // Clear notes for affected row/col/box
      const nextNotes = notes.map((row) => row.map((cell) => new Set(cell)));
      nextNotes[r][c] = new Set();
      if (num !== 0) {
        for (let i = 0; i < 9; i++) {
          nextNotes[r][i].delete(num);
          nextNotes[i][c].delete(num);
        }
        const br = Math.floor(r / 3) * 3;
        const bc = Math.floor(c / 3) * 3;
        for (let dr = 0; dr < 3; dr++)
          for (let dc = 0; dc < 3; dc++)
            nextNotes[br + dr][bc + dc].delete(num);
      }

      setNotes(nextNotes);
      setBoard(nextBoard);
      setConflicts(getConflicts(nextBoard.map((row) => [...row])));

      if (isBoardComplete(nextBoard) && getConflicts(nextBoard.map((r) => [...r])).size === 0) {
        setWon(true);
        setTimerActive(false);
      }
    },
    [selected, solving, won, board, initial, notes, noteMode]
  );

  // Animated auto-solve using backtracking steps
  const autoSolve = useCallback(() => {
    if (solving || won) return;
    const steps = solveWithSteps(board.map((r) => [...r]));
    setSolving(true);
    setTimerActive(false);

    const current = board.map((r) => [...r]);
    let i = 0;

    const tick = () => {
      if (i >= steps.length) {
        const finalBoard = board.map((r) => [...r]);
        solve(finalBoard);
        setBoard(finalBoard);
        setConflicts(new Set());
        setSolving(false);
        setSolveCell(null);
        setAutoSolved(true);
        return;
      }
      const { r, c, n, type } = steps[i];
      current[r][c] = n;
      setSolveCell({ r, c, type });
      setBoard(current.map((row) => [...row]));
      i++;
      setTimeout(tick, 4);
    };
    tick();
  }, [solving, won, board]);

  // Keyboard navigation + input
  useEffect(() => {
    const handler = (e) => {
      if (e.key >= '1' && e.key <= '9') inputNumber(Number(e.key));
      if (['Backspace', 'Delete', '0'].includes(e.key)) inputNumber(0);
      if (!selected) return;
      const [r, c] = selected;
      if (e.key === 'ArrowUp' && r > 0) setSelected([r - 1, c]);
      if (e.key === 'ArrowDown' && r < 8) setSelected([r + 1, c]);
      if (e.key === 'ArrowLeft' && c > 0) setSelected([r, c - 1]);
      if (e.key === 'ArrowRight' && c < 8) setSelected([r, c + 1]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [inputNumber, selected]);

  return {
    board, initial, selected, setSelected,
    conflicts, mistakes, won, autoSolved,
    solving, solveCell,
    noteMode, setNoteMode,
    notes, difficulty,
    timerActive,
    inputNumber, autoSolve, newGame,
  };
}
