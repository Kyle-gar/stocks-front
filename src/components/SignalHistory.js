import React from "react";

function SignalHistory({ history }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Signal History</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            [{h.time}] {h.signal} ({Math.round(h.confidence * 100)}%) @ ${h.price} | Size: {h.position_size}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SignalHistory;
