// src/pages/splash/SplashController.ts
import { SplashView } from './SplashView';
import { router } from '@/services/RouterService';
import { SPLASH_DURATION_MS, SPLASH_MESSAGES } from '@/constants';
export class SplashController {
    constructor() {
        Object.defineProperty(this, "view", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "progress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "messageIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "intervalId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.view = new SplashView();
    }
    async init() {
        this.view.render();
        await this.startLoading();
    }
    startLoading() {
        return new Promise((resolve) => {
            const startTime = Date.now();
            this.intervalId = window.setInterval(() => {
                const elapsed = Date.now() - startTime;
                this.progress = Math.min(100, (elapsed / SPLASH_DURATION_MS) * 100);
                this.view.updateProgress(this.progress);
                if (Math.floor(elapsed / 700) > this.messageIndex &&
                    this.messageIndex < SPLASH_MESSAGES.length - 1) {
                    this.messageIndex++;
                    this.view.updateMessage(SPLASH_MESSAGES[this.messageIndex]);
                }
                if (elapsed >= SPLASH_DURATION_MS) {
                    this.complete(resolve);
                }
            }, 16);
        });
    }
    async complete(resolve) {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.view.updateProgress(100);
        this.view.updateMessage('Ready!');
        // Small delay for visual feedback
        await new Promise(resolveTimeout => setTimeout(resolveTimeout, 300));
        resolve();
        // Navigate to home after splash completes
        await router.navigate('home');
    }
}
