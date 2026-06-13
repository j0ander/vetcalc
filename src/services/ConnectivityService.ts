type ConnectivityListener = (isOnline: boolean) => void

// ─── ConnectivityService ──────────────────────────────────────────────────────

export class ConnectivityService {
  private listeners: ConnectivityListener[] = []

  constructor() {
    window.addEventListener('online', () => this.notify(true))
    window.addEventListener('offline', () => this.notify(false))
  }

  isOnline(): boolean {
    return navigator.onLine
  }

  onChange(listener: ConnectivityListener): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notify(isOnline: boolean): void {
    this.listeners.forEach((l) => l(isOnline))
  }
}

export const connectivityService = new ConnectivityService()