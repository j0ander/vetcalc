// src/services/RouterService.ts (con corrección en navigate)
import type { AppRoute } from '@/types'

type RouteHandler = () => void | Promise<void>

export interface Destroyable {
  destroy(): void
}

class RouterService {
  private routes: Map<AppRoute, RouteHandler> = new Map()
  private currentRoute: AppRoute | null = null
  private previousRoute: AppRoute | null = null

  constructor() {
    this.setupHashChangeListener()
  }

  private setupHashChangeListener(): void {
    window.addEventListener('hashchange', async () => {
      const route = this.getRouteFromHash()
      if (route && route !== this.currentRoute) {
        await this.handleRoute(route)
      }
    })
  }

  private getRouteFromHash(): AppRoute | null {
    let hash = window.location.hash.slice(1)
    if (hash.startsWith('/')) hash = hash.slice(1)
    if (!hash) return 'home'
    return this.routes.has(hash as AppRoute) ? (hash as AppRoute) : null
  }

  private async handleRoute(route: AppRoute): Promise<void> {
    const handler = this.routes.get(route)
    if (!handler) {
      console.error(`[Router] No handler for route: ${route}`)
      return
    }

    try {
      this.previousRoute = this.currentRoute
      this.currentRoute = route
      console.log(`[Router] → ${route}`)
      await handler()
    } catch (error) {
      console.error(`[Router] Error in ${route}:`, error)
      if (route !== 'home') await this.navigate('home')
    }
  }

  register(route: AppRoute, handler: RouteHandler): void {
    if (this.routes.has(route)) {
      console.warn(`[Router] Overwriting route: ${route}`)
    }
    this.routes.set(route, handler)
    console.log(`[Router] Registered: ${route}`)
  }

  async navigate(route: AppRoute): Promise<void> {
    if (route === this.currentRoute) return

    const newHash = route === 'home' ? '' : route

    if (window.location.hash.replace('#', '') !== newHash) {
      window.location.hash = newHash
      return
    }

    await this.handleRoute(route)
  }

  resolveInitialRoute(): AppRoute {
    const route = this.getRouteFromHash()
    if (route && this.routes.has(route)) {
      console.log(`[Router] Initial route from hash: ${route}`)
      return route
    }
    console.log('[Router] No valid hash, default to home')
    return 'home'
  }

  getCurrentRoute(): AppRoute | null {
    return this.currentRoute
  }

  getPreviousRoute(): AppRoute | null {
    return this.previousRoute
  }

  back(): void {
    window.history.back()
  }
}

export const router = new RouterService()