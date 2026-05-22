import React from 'react';

export default function Banner({ won, autoSolved, time, mistakes }) {
  if (!won && !autoSolved) return null;

  return (
    <div style={{
      background: won
        ? 'linear-gradient(135deg,#1a2e1a,#162e16)'
        : 'linear-gradient(135deg,#1a1a2e,#16162e)',
      border: `1px solid ${won ? '#a8ff78' : '#7ec8e3'}`,
      color: won ? '#a8ff78' : '#7ec8e3',
      padding: '8px 20px',
      borderRadius: 8,
      fontSize: 13,
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: "'Courier New', monospace",
    }}>
      {won
        ? `🎉 Solved in ${time} with ${mistakes} mistake${mistakes !== 1 ? 's' : ''}!`
        : '🤖 Auto-solved via backtracking algorithm'}
    </div>
  );
}
