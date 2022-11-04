import {
  useRef,
  createContext,
  useContext,
  useSyncExternalStore,
  PropsWithChildren,
} from "react";

export const StoreContext = createContext(null);

export function createStore<T>(initalValue: T) {
  let store = { ...initalValue };
  const subscribers = new Set<() => void>();
  const get = () => store;

  const set = (value: Partial<T>) => {
    store = { ...store, ...value };
    subscribers.forEach((callback) => callback());
  };

  const subscribe = (callback: () => void) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  };

  return {
    get,
    set,
    subscribe,
  };
}

export function useStore<T, R>(
  selector: (store: T) => R,
  initialState?
): [R, (value: Partial<T>) => void] {
  const store: ReturnType<typeof createStore<T>> = useContext(StoreContext);

  if (!store) {
    throw new Error("Store not found");
  }

  const state = useSyncExternalStore(
    store.subscribe,
    () => selector(store.get()),
    () => selector(initialState ?? store.get())
  );

  return [state, store.set];
}

interface StoreProviderProps extends PropsWithChildren {
  store: ReturnType<typeof createStore>;
}
export const StoreProvider = (props: StoreProviderProps) => {
  const { children, store } = props;
  const storeRef = useRef(store);

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};
