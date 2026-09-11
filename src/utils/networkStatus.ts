type Listener = (offline: boolean) => void;

const listeners = new Set<Listener>();
let offline = false;

export const setNetworkOffline = (nextOffline: boolean) => {
    if (offline === nextOffline) return;
    offline = nextOffline;
    listeners.forEach((listener) => listener(offline));
};

export const subscribeNetworkStatus = (listener: Listener) => {
    listeners.add(listener);
    listener(offline);
    return () => listeners.delete(listener);
};
