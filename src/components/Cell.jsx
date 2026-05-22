import React from 'react';

export default function Cell({
  value, row, col,
  isFixed, isSelected, isHighlight, isSameNum,
  isConflict, isSolving, solveType,
  notes, onClick,
}) {
  const borderRight = (col + 1) % 3 === 0 && col !== 8 ? '2px solid #555' : '1px solid #2a2a2a';
  const borderBottom = (row + 1) % 3 === 0 && row !== 8 ? '2px solid #555' : '1px solid #2a2a2a';

  let bg = 'transparent';
  if (isSelected)   bg = 'rgba(168,255,120,0.20)';
  else if (isSolving && solveType === 'backtrack') bg = 'rgba(255,107,107,0.18)';
  else if (isSolving) bg = 'rgba(248,255,107,0.22)';
  else if (isSameNum) bg = 'rgba(168,255,120,0.13)';
  else if (isHighlight) bg = 'rgba(168,255,120,0.05)';
  if (isConflict && !isSolving) bg = 'rgba(255,80,80,0.14)';

  let numColor = isFixed ? '#d4c9a8' : '#a8ff78';
  if (isConflict) numColor = '#ff6b6b';
  if (isSolving) numColor = solveType === 'backtrack' ? '#ff9a9a' : '#f8ff6b';

  const textShadow = isSolving
    ? `0 0 10px ${solveType === 'backtrack' ? '#ff6b6b' : '#f8ff6b'}`
    : 'none';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', background: bg,
        borderRight, borderBottom,
        transition: 'background 0.08s',
        position: 'relative',
      }}
    >
      {value !== 0 ? (
        <span style={{
          fontSize: 'clamp(14px, 4vw, 20px)',
          fontWeight: 'bold',
          color: numColor,
          textShadow,
          fontFamily: "'Courier New', monospace",
          lineHeight: 1,
          transition: 'color 0.1s, text-shadow 0.1s',
        }}>
          {value}
        </span>
      ) : notes && notes.size > 0 ? (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          width: '100%', height: '100%', padding: '1px',
        }}>
          {[1,2,3,4,5,6,7,8,9].map((n) => (
            <span key={n} style={{
              fontSize: 'clamp(5px, 1.4vw, 8px)',
              color: '#7ec8e3',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1,
              opacity: notes.has(n) ? 1 : 0,
            }}>
              {n}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
