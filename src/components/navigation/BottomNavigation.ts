import { NAV_ITEMS } from '@/constants'
import type { AppRoute } from '@/types'
import { router } from '@/services/RouterService'

// ─── BottomNavigation ─────────────────────────────────────────────────────────

export class BottomNavigation {
  private container: HTMLElement
  private currentRoute: AppRoute = 'home'

  constructor() {
    this.container = document.createElement('nav')
    this.container.className =
      'fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 pb-safe ' +
      'bg-surface h-[64px] shadow-[0px_-2px_8px_rgba(38,50,56,0.08)] z-50'
    this.render()
  }

  getElement(): HTMLElement {
    return this.container
  }

  setActiveRoute(route: AppRoute): void {
    this.currentRoute = route
    this.render()
  }

  private render(): void {
    this.container.innerHTML = NAV_ITEMS.map((item) => {
      const isActive = item.route === this.currentRoute
      const activeClasses = isActive
        ? 'text-primary font-bold border-t-2 border-primary'
        : 'text-on-surface-variant hover:bg-surface-container-low'

      return `
        <button
          data-route="${item.route}"
          class="flex flex-col items-center justify-center pt-2 flex-1 transition-colors duration-150 active:scale-95 ${activeClasses}"
          aria-label="${item.label}"
          aria-current="${isActive ? 'page' : 'false'}"
        >
          <span
            class="material-symbols-outlined"
            style="${isActive ? "font-variation-settings: 'FILL' 1;" : ''}"
          >${item.icon}</span>
          <span class="font-label-sm text-label-sm">${item.label}</span>
        </button>
      `
    }).join('')

    this.container.querySelectorAll<HTMLButtonElement>('[data-route]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const route = btn.dataset['route'] as AppRoute
        router.navigate(route)
      })
    })
  }
}