// src/main.ts
import { router, type Destroyable } from '@/services/RouterService';
import { SplashController } from '@/pages/splash/SplashController';
import { HomeController } from '@/pages/home/HomeController';
import type { AppRoute } from '@/types';
import { ConverterController } from '@/pages/converter/ConverterController';
import { AnesthesiaController } from '@/pages/anesthesia/AnesthesiaController';
import { DosageController } from '@/pages/dosage/DosageController';
import { FluidotherapyController } from '@/pages/fluidotherapy/FluidotherapyController';
import { HistoryController } from '@/pages/history/HistoryController';
import { LibraryController } from '@/pages/library/LibraryController';
import { PatientsController } from '@/pages/patients/PatientsController';
import { PremiumController } from '@/pages/premium/PremiumController';
import { LoginController } from '@/pages/login/LoginController';
import { RegisterController } from '@/pages/register/RegisterController';
import { authService } from '@/services/AuthService';

let currentController: Destroyable | null = null;

function destroyCurrentController(): void {
  if (currentController) {
    currentController.destroy();
    currentController = null;
  }
}

// Helper para registrar páginas públicas (sin protección)
function registerPublicPage(
  route: AppRoute,
  createController: () => Destroyable & { init(): Promise<void> }
): void {
  router.register(route, async () => {
    destroyCurrentController();
    const controller = createController();
    currentController = controller;
    await controller.init();
  });
}

// Helper para registrar páginas protegidas (requieren login)
function registerProtectedPage(
  route: AppRoute,
  createController: () => Destroyable & { init(): Promise<void> }
): void {
  router.register(route, async () => {
    if (!authService.isLoggedIn()) {
      await router.navigate('login');
      return;
    }
    destroyCurrentController();
    const controller = createController();
    currentController = controller;
    await controller.init();
  });
}

class VetCalcApp {
  async init(): Promise<void> {
    // Rutas públicas (sin login)
    router.register('splash', async () => {
      const controller = new SplashController();
      await controller.init();
    });

    registerPublicPage('login', () => new LoginController());
    registerPublicPage('register', () => new RegisterController());

    // Rutas protegidas (requieren login)
    registerProtectedPage('home', () => new HomeController());
    registerProtectedPage('patients', () => new PatientsController());
    registerProtectedPage('library', () => new LibraryController());
    registerProtectedPage('history', () => new HistoryController());
    registerProtectedPage('fluidotherapy', () => new FluidotherapyController());
    registerProtectedPage('dosage', () => new DosageController());
    registerProtectedPage('converter', () => new ConverterController());
    registerProtectedPage('anesthesia', () => new AnesthesiaController());
    registerProtectedPage('premium', () => new PremiumController());

    // Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => console.log('[SW] OK', reg))
          .catch(err => console.log('[SW] ERROR', err));
      });
    }

    // Determinar ruta inicial
    const splashShown = sessionStorage.getItem('vetcalc-splash-shown') === 'true';
    if (!splashShown) {
      sessionStorage.setItem('vetcalc-splash-shown', 'true');
      await router.navigate('splash');
    } else {
      let initialRoute = router.resolveInitialRoute();
      // Si no hay sesión y la ruta inicial no es pública, redirigir a login
      if (!authService.isLoggedIn() && initialRoute !== 'splash' && initialRoute !== 'login' && initialRoute !== 'register') {
        initialRoute = 'login';
      }
      await router.navigate(initialRoute);
    }
  }
}

new VetCalcApp().init();