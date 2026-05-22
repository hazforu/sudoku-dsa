import React from 'react';

export default function Stats({ time, mistakes, difficulty }) {
  return (
    <div style={{
      display: 'flex',
      gap: 24,
      marginBottom: 12,
    }}>
      <StatItem label="TIME" value={time} />
      <StatItem
        label="MISTAKES"
        value={mistakes}
        valueStyle={{ color: mistakes > 0 ? '#ff6b6b' : '#a8ff78' }}
      />
      <StatItem label="MODE" value={difficulty.toUpperCase()} />
    </div>
  );
}

function StatItem({ label, value, valueStyle }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{
        fontSize: 9, color: '#555', letterSpacing: 2,
        fontFamily: "'Courier New', monospace",
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 16, color: '#a8ff78', fontWeight: 'bold',
        letterSpacing: 1, fontFamily: "'Courier New', monospace",
        ...valueStyle,
      }}>
        {value}
      </span>
    </div>
  );
}
