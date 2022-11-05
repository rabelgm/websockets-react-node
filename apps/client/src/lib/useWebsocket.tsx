import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const WebsocketConnectionContext = createContext<W3CWebSocket>(null);

export const createWebsocketConnection = (url: string) => new W3CWebSocket(url);

export const useWebsocketConnection = () =>
  useContext(WebsocketConnectionContext);

export const useWebSocket = (e: string, cb: (data: unknown) => void) => {
  const socket = useWebsocketConnection();

  useEffect(() => {
    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data.toString());

      if (data.type === e) {
        cb(data);
      }
    };
  }, []);
};

interface WebsocketConnectionProviderProps extends PropsWithChildren {
  connection: ReturnType<typeof createWebsocketConnection>;
}
export const WebsocketConnectionProvider = (
  props: WebsocketConnectionProviderProps
) => {
  const { children, connection } = props;
  const connectionRef = useRef(connection);

  return (
    <WebsocketConnectionContext.Provider value={connectionRef.current}>
      {children}
    </WebsocketConnectionContext.Provider>
  );
};
