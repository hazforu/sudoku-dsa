import React from 'react';
import Cell from './Cell';

export default function Board({
  board, initial, selected, setSelected,
  conflicts, solveCell, notes,
}) {
  const selVal = selected ? board[selected[0]][selected[1]] : 0;

  return (
    <div style={{
      padding: 3,
      background: 'linear-gradient(135deg,#333,#111)',
      borderRadius: 4,
      boxShadow: '0 0 40px rgba(168,255,120,0.07), 0 8px 32px rgba(0,0,0,0.8)',
      marginBottom: 16,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9,1fr)',
        gridTemplateRows: 'repeat(9,1fr)',
        width: 'min(90vw, 380px)',
        height: 'min(90vw, 380px)',
        background: '#111',
        border: '2px solid #555',
      }}>
        {board.map((row, r) =>
          row.map((val, c) => {
            const key = `${r}-${c}`;
            const isSelected = selected?.[0] === r && selected?.[1] === c;
            const isFixed = initial[r][c] !== 0;
            const isConflict = conflicts.has(key);
            const isSolveActive = solveCell?.r === r && solveCell?.c === c;
            const sameNum = selVal && val === selVal && val !== 0 && !isSelected;
            const isHighlight = !isSelected && selected && (
              selected[0] === r || selected[1] === c ||
              (Math.floor(selected[0] / 3) === Math.floor(r / 3) &&
               Math.floor(selected[1] / 3) === Math.floor(c / 3))
            );

            return (
              <Cell
                key={key}
                value={val}
                row={r} col={c}
                isFixed={isFixed}
                isSelected={isSelected}
                isHighlight={isHighlight}
                isSameNum={sameNum}
                isConflict={isConflict}
                isSolving={isSolveActive}
                solveType={solveCell?.type}
                notes={notes[r][c]}
                onClick={() => setSelected([r, c])}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
