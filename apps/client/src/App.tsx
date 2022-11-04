import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useStore } from "./lib/createContext";
import { RootStore } from "./main";

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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
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
  const client = useRef<W3CWebSocket>();

  useEffect(() => {
    client.current = new W3CWebSocket("ws://localhost:4000");

    client.current.onmessage = (message) => {
      console.log(message);
      setCount({ count: Number(message.data) });
    };

    return () => {
      if (client.current !== null) {
        client.current.close();
      }
    };
  }, []);

  return <button onClick={() => client?.current?.send("add")}>ADD</button>;
};

export default App;
