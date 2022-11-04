import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  PropsWithChildren,
} from "react";

type UseStoreDataReturnType = ReturnType<typeof useStoreData>;
export const StoreContext = createContext<UseStoreDataReturnType | null>(null);

function useStoreData<T>(initialState: T): {
  get: () => T;
  set: (value: Partial<T>) => void;
  subscribe: (callback: () => void) => () => void;
} {
  const store = useRef(initialState);

  const get = useCallback(() => store.current, []);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<T>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
}

export function useStore(
  selector: (store) => any
): [any, (value: Partial<any>) => void] {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("Store not found");
  }

  const state = useSyncExternalStore(
    store.subscribe,
    () => selector(store.get()),
    () => selector(store.get())
  );

  return [state, store.set];
}

interface ContexProviderProps<T> extends PropsWithChildren {
  initialData: T;
}
export function ContextProvider<T>(props: ContexProviderProps<T>) {
  const { children, initialData } = props;

  return (
    <StoreContext.Provider value={useStoreData<T>(initialData)}>
      {children}
    </StoreContext.Provider>
  );
}
