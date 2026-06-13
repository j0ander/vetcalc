// ─── ConnectivityService ──────────────────────────────────────────────────────
export class ConnectivityService {
    constructor() {
        Object.defineProperty(this, "listeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        window.addEventListener('online', () => this.notify(true));
        window.addEventListener('offline', () => this.notify(false));
    }
    isOnline() {
        return navigator.onLine;
    }
    onChange(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
    notify(isOnline) {
        this.listeners.forEach((l) => l(isOnline));
    }
}
export const connectivityService = new ConnectivityService();
