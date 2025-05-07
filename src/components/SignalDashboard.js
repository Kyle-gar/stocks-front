import React, { useEffect, useState, useRef } from "react";
import SignalHistory from "./SignalHistory";

const API_URL = "https://stocks-back.onrender.com/signal"; // Use your backend URL

function SignalDashboard({ ticker, account, risk }) {
  const [signal, setSignal] = useState(null);
  const [history, setHistory] = useState([]);
  const [autoMode, setAutoMode] = useState(false);
  const intervalRef = useRef(null);

  // Function to fetch signal
  const fetchSignal = async () => {
    const res = await fetch(`${API_URL}?ticker=${ticker}&account_balance=${account}&risk_per_trade=${risk}`);
    const data = await res.json();
    setSignal(data);
    setHistory(h => [{...data, time: new Date().toLocaleTimeString()}, ...h].slice(0, 20));
  };

  // Manual fetch on ticker/account/risk change
  useEffect(() => {
    if (!autoMode) fetchSignal();
    // eslint-disable-next-line
  }, [ticker, account, risk]);

  // Auto mode effect
  useEffect(() => {
    if (autoMode) {
      fetchSignal(); // Fetch immediately
      intervalRef.current = setInterval(fetchSignal, 15000); // Fetch every 15s
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [autoMode, ticker, account, risk]);

  // Box color logic
  let boxColor = "#ccc";
  let boxText = "HOLD";
  if (signal) {
    if (signal.signal === "Buy") {
      boxColor = "#4caf50";
      boxText = "BUY";
    } else if (signal.signal === "Sell") {
      boxColor = "#f44336";
      boxText = "SELL";
    }
  }

  return (
    <div>
      <div style={{
        width: 200,
        height: 100,
        background: boxColor,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 36,
        fontWeight: "bold",
        borderRadius: 12,
        margin: "20px auto"
      }}>
        {boxText}
      </div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {autoMode ? (
          <button onClick={() => setAutoMode(false)} style={{ background: "#f44336", color: "#fff", padding: "10px 20px", border: "none", borderRadius: 6 }}>
            Stop Trading Block
          </button>
        ) : (
          <button onClick={() => setAutoMode(true)} style={{ background: "#4caf50", color: "#fff", padding: "10px 20px", border: "none", borderRadius: 6 }}>
            Start Trading Block
          </button>
        )}
      </div>
      {signal && (
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          <div>Price: ${signal.price}</div>
          <div>Position Size: {signal.position_size} shares</div>
          <div>Confidence: {Math.round(signal.confidence * 100)}%</div>
        </div>
      )}
      <SignalHistory history={history} />
    </div>
  );
}

export default SignalDashboard;
