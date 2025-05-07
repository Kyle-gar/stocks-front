    import React, { useState } from "react";
    import SignalDashboard from "./components/SignalDashboard";

    function App() {
    const [ticker, setTicker] = useState("AAPL");
    const [account, setAccount] = useState(10000);
    const [risk, setRisk] = useState(0.01);

    return (
        <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
        <h1>AlphaPulse</h1>
        <form style={{ marginBottom: 20 }}>
            <input value={ticker} onChange={e => setTicker(e.target.value)} placeholder="Ticker" />
            <input type="number" value={account} onChange={e => setAccount(Number(e.target.value))} placeholder="Account Balance" />
            <input type="number" step="0.01" value={risk} onChange={e => setRisk(Number(e.target.value))} placeholder="Risk per Trade (e.g. 0.01)" />
        </form>
        <SignalDashboard ticker={ticker} account={account} risk={risk} />
        </div>
    );
    }

    export default App;
