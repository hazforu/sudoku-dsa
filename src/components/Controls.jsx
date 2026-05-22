import React from 'react';

export default function Controls({
  noteMode, setNoteMode,
  onAutoSolve, solving, won,
  difficulty, onNewGame,
}) {
  const btn = {
    flex: 1,
    background: '#1a1a1a',
    border: '1px solid #2e2e2e',
    color: '#888',
    padding: '10px 12px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 12,
    fontFamily: "'Courier New', monospace",
    transition: 'all 0.15s',
  };

  const diffBtn = (d) => ({
    flex: 1,
    background: difficulty === d ? '#1a2a1a' : '#111',
    border: `1px solid ${difficulty === d ? '#a8ff78' : '#2a2a2a'}`,
    color: difficulty === d ? '#a8ff78' : '#555',
    padding: '8px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 11,
    fontFamily: "'Courier New', monospace",
    textTransform: 'uppercase',
    letterSpacing: 1,
  });

  const row = {
    display: 'flex', gap: 8, marginBottom: 8,
    flexWrap: 'wrap', justifyContent: 'center',
    width: 'min(90vw, 380px)',
  };

  return (
    <>
      {/* Action buttons */}
      <div style={row}>
        <button
          style={{
            ...btn,
            ...(noteMode ? { borderColor: '#a8ff78', color: '#a8ff78', background: '#1a2a1a' } : {}),
          }}
          onClick={() => setNoteMode((n) => !n)}
        >
          [✎] Notes: {noteMode ? "ACTIVE" : "STDBY"}

        </button>
        <button
          style={{ ...btn, opacity: solving || won ? 0.5 : 1 }}
          onClick={onAutoSolve}
          disabled={solving || won}
        >
          
{solving ? "❖ COMPUTING..." : "[⚙] RUN SOLVER"}
        </button>
      </div>

      {/* Difficulty */}
      <div style={row}>
        {['easy', 'medium', 'hard'].map((d) => (
          <button key={d} style={diffBtn(d)} onClick={() => onNewGame(d)}>
            {d}
          </button>
        ))}
      </div>

      {/* New Game */}
      <button
        style={{
          background: 'transparent',
          border: '1px solid #e8d5a333',
          color: '#e8d5a3',
          padding: '10px 40px',
          borderRadius: 8,
          cursor: 'pointer',
          fontSize: 13,
          fontFamily: "'Courier New', monospace",
          letterSpacing: 2,
          marginBottom: 16,
          transition: 'all 0.2s',
        }}
        onClick={() => onNewGame(difficulty)}
      >
        ↺ New Game
      </button>
    </>
  );
}
