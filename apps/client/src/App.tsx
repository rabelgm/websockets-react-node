import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";

import { w3cwebsocket as W3CWebSocket } from "websocket";

function App() {
  const [count, setCount] = useState(0);
  const client = useRef<W3CWebSocket>();

  useEffect(() => {
    client.current = new W3CWebSocket("ws://localhost:4000");

    return () => {
      if (client.current !== null) {
        client?.current?.close();
      }
    };
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => client?.current?.send("add")}>ADD</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
