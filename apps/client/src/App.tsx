import { useEffect, useId, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useStore } from "./lib/createContext";
import { RootStore } from "./main";
import { useWebSocket, useWebsocketConnection } from "./lib/useWebsocket";

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Count />
      <Add />
      <div className="read-the-docs">
        <Logs />
      </div>
    </div>
  );
}

const Count = () => {
  const [count, _] = useStore((store: RootStore) => store.count);

  return (
    <div className="card">
      <p>{count}</p>
    </div>
  );
};

const Add = () => {
  const [_, setCount] = useStore((store: RootStore) => store.count);
  const client = useWebsocketConnection();

  useWebSocket("add", (data) => {
    setCount({ ...data.payload });
  });

  return <button onClick={() => client?.send("add")}>ADD</button>;
};

const Logs = () => {
  const [logs, setLogs] = useStore((store: RootStore) => store.logs);

  return (
    <>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
      <button onClick={() => setLogs({ logs: [...logs, `${Math.random()}`] })}>
        Add Random Log
      </button>
    </>
  );
};

export default App;
