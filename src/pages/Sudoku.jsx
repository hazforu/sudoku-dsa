import React from 'react';
import Board from '../components/Board';
import Numpad from '../components/Numpad';
import Stats from '../components/Stats';
import Controls from '../components/Controls';
import Banner from '../components/Banner';
import { useGameState } from '../hooks/useGameState';
import { useTimer } from '../hooks/useTimer';

export default function SudokuPage() {
  const game = useGameState();
  const { formatted: time } = useTimer(game.timerActive);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0d0f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 12px 40px',
      fontFamily: "'Courier New', monospace",
      userSelect: 'none',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 32, color: '#e8d5a3', letterSpacing: 4 }}>数独</span>
        <span style={{ fontSize: 11, color: '#555', letterSpacing: 8 }}>SUDOKU</span>
      </div>

      <Stats time={time} mistakes={game.mistakes} difficulty={game.difficulty} />

      <Banner
        won={game.won}
        autoSolved={game.autoSolved}
        time={time}
        mistakes={game.mistakes}
      />

      <Board
        board={game.board}
        initial={game.initial}
        selected={game.selected}
        setSelected={game.setSelected}
        conflicts={game.conflicts}
        solveCell={game.solveCell}
        notes={game.notes}
      />

      <Numpad onInput={game.inputNumber} />

      <Controls
        noteMode={game.noteMode}
        setNoteMode={game.setNoteMode}
        onAutoSolve={game.autoSolve}
        solving={game.solving}
        won={game.won}
        difficulty={game.difficulty}
        onNewGame={game.newGame}
      />

      <div style={{ fontSize: 9, color: '#2a2a2a', letterSpacing: 2, textTransform: 'uppercase' }}>
        DSA · Backtracking · Constraint Propagation · 2D Array
      </div>
    </div>
  );
}
