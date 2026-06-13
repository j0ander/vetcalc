import { SplashTemplate } from '@/templates/SplashTemplate';
export class SplashView {
    constructor() {
        Object.defineProperty(this, "progressBar", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "messageElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
    }
    render() {
        const appElement = document.getElementById('app');
        if (appElement) {
            appElement.innerHTML = SplashTemplate;
        }
        // Añadir clase para fondo verde y overflow hidden
        document.body.classList.add('splash-body');
        this.setupElements();
    }
    setupElements() {
        this.progressBar = document.getElementById('progress-bar');
        this.messageElement = document.getElementById('splash-message');
    }
    updateProgress(percent) {
        if (this.progressBar) {
            this.progressBar.style.width = `${percent}%`;
        }
    }
    updateMessage(message) {
        if (this.messageElement) {
            this.messageElement.textContent = message;
        }
    }
}
