class RouterService {
    constructor() {
        Object.defineProperty(this, "routes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "currentRoute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "previousRoute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.setupHashChangeListener();
    }
    setupHashChangeListener() {
        window.addEventListener('hashchange', async () => {
            const route = this.getRouteFromHash();
            if (route && route !== this.currentRoute) {
                await this.handleRoute(route);
            }
        });
    }
    getRouteFromHash() {
        let hash = window.location.hash.slice(1);
        if (hash.startsWith('/'))
            hash = hash.slice(1);
        if (!hash)
            return 'home';
        return this.routes.has(hash) ? hash : null;
    }
    async handleRoute(route) {
        const handler = this.routes.get(route);
        if (!handler) {
            console.error(`[Router] No handler for route: ${route}`);
            return;
        }
        try {
            this.previousRoute = this.currentRoute;
            this.currentRoute = route;
            console.log(`[Router] → ${route}`);
            await handler();
        }
        catch (error) {
            console.error(`[Router] Error in ${route}:`, error);
            if (route !== 'home')
                await this.navigate('home');
        }
    }
    register(route, handler) {
        if (this.routes.has(route)) {
            console.warn(`[Router] Overwriting route: ${route}`);
        }
        this.routes.set(route, handler);
        console.log(`[Router] Registered: ${route}`);
    }
    async navigate(route) {
        if (route === this.currentRoute)
            return;
        const newHash = route === 'home' ? '' : route;
        if (window.location.hash.replace('#', '') !== newHash) {
            window.location.hash = newHash;
            return;
        }
        await this.handleRoute(route);
    }
    resolveInitialRoute() {
        const route = this.getRouteFromHash();
        if (route && this.routes.has(route)) {
            console.log(`[Router] Initial route from hash: ${route}`);
            return route;
        }
        console.log('[Router] No valid hash, default to home');
        return 'home';
    }
    getCurrentRoute() {
        return this.currentRoute;
    }
    getPreviousRoute() {
        return this.previousRoute;
    }
    back() {
        window.history.back();
    }
}
export const router = new RouterService();
