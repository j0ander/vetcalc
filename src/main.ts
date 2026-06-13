// src/main.ts (con registerPage helper y splash por sesión)
import { router, type Destroyable } from '@/services/RouterService'
import { SplashController } from '@/pages/splash/SplashController'
import { HomeController } from '@/pages/home/HomeController'
import type { AppRoute } from '@/types'
let currentController: Destroyable | null = null

function destroyCurrentController(): void {
  if (currentController) {
    currentController.destroy()
    currentController = null
  }
}

// Helper para registrar páginas que limpian el controlador anterior
function registerPage(
  route: AppRoute,
  createController: () => Destroyable & { init(): Promise<void> }
): void {
  router.register(route, async () => {
    destroyCurrentController()
    const controller = createController()
    currentController = controller
    await controller.init()
  })
}

class VetCalcApp {
  async init(): Promise<void> {
    // Registrar splash (no usa el helper porque no limpia nada)
    router.register('splash', async () => {
      const controller = new SplashController()
      await controller.init()
    })

    // Registrar páginas principales con el helper
    registerPage('home', () => new HomeController())

    // Placeholders para Fase 2 (también limpian el controlador anterior)
    const notImplemented = () => {
      console.log('[Router] Página no implementada en Fase 2')
      return {
        init: async () => {
          const app = document.getElementById('app')
          if (app) {
            app.innerHTML = `
              <div class="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <span class="material-symbols-outlined text-6xl text-primary mb-4">construction</span>
                <h2 class="font-headline-md text-headline-md mb-2">Próximamente</h2>
                <p class="text-on-surface-variant">Esta pantalla estará disponible en la Fase 2 del desarrollo.</p>
                <button onclick="window.location.hash='home'" class="mt-6 px-6 py-2 bg-primary text-on-primary rounded-lg">
                  Volver al inicio
                </button>
              </div>
            `
          }
        },
        destroy: () => {}
      }
    }

    registerPage('patients', notImplemented)
    registerPage('library', notImplemented)
    registerPage('history', notImplemented)
    registerPage('fluidotherapy', notImplemented)
    registerPage('dosage', notImplemented)
    registerPage('converter', notImplemented)
    registerPage('anesthesia', notImplemented)
    registerPage('premium', notImplemented)

    // Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => console.log('[SW] OK', reg))
          .catch(err => console.log('[SW] ERROR', err))
      })
    }

    // Mostrar splash solo una vez por sesión
    const splashShown = sessionStorage.getItem('vetcalc-splash-shown') === 'true'
    if (!splashShown) {
      sessionStorage.setItem('vetcalc-splash-shown', 'true')
      await router.navigate('splash')
    } else {
      const initialRoute = router.resolveInitialRoute()
      await router.navigate(initialRoute)
    }
  }
}

new VetCalcApp().init()