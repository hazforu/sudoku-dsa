import React from 'react';

export default function Numpad({ onInput }) {
  const btnStyle = {
    background: '#1a1a1a',
    border: '1px solid #2e2e2e',
    color: '#d4c9a8',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 8,
    padding: '12px 0',
    cursor: 'pointer',
    fontFamily: "'Courier New', monospace",
    transition: 'background 0.1s, transform 0.08s',
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      gap: 8,
      marginBottom: 12,
      width: 'min(90vw, 380px)',
    }}>
      {[1,2,3,4,5,6,7,8,9].map((n) => (
        <button
          key={n}
          style={btnStyle}
          onPointerDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
          onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onClick={() => onInput(n)}
        >
          {n}
        </button>
      ))}
      <button
        style={{ ...btnStyle, color: '#ff6b6b', borderColor: '#ff6b6b33', gridColumn: '5' }}
        onClick={() => onInput(0)}
        onPointerDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
        onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        ✕
      </button>
    </div>
  );
}
