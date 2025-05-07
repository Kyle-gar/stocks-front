import React, { useEffect, useState } from "react";
import SignalHistory from "./SignalHistory";

const API_URL = "https://stocks-back.onrender.com"; // Replace with your backend URL

function SignalDashboard({ ticker, account, risk }) {
  const [signal, setSignal] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchSignal = async () => {
      const res = await fetch(`${API_URL}?ticker=${ticker}&account_balance=${account}&risk_per_trade=${risk}`);
      const data = await res.json();
      setSignal(data);
      setHistory(h => [{...data, time: new Date().toLocaleTimeString()}, ...h].slice(0, 20));
    };
    fetchSignal();
    const id = setInterval(fetchSignal, 15000);
    return () => clearInterval(id);
  }, [ticker, account, risk]);

  return (
    <div>
      {signal && (
        <div style={{ marginBottom: 20 }}>
          <h2>Signal: <span style={{
            color: signal.signal === "Buy" ? "green" : signal.signal === "Sell" ? "red" : "gray"
          }}>{signal.signal}</span> ({Math.round(signal.confidence * 100)}%)</h2>
          <div>Price: ${signal.price}</div>
          <div>Position Size: {signal.position_size} shares</div>
        </div>
      )}
      <SignalHistory history={history} />
    </div>
  );
}

export default SignalDashboard;
