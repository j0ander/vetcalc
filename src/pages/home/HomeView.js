// src/pages/home/HomeView.ts (VERSIÓN SIN TIMEOUT)
import { HomeTemplate } from '@/templates/HomeTemplate';
export class HomeView {
    constructor() {
        Object.defineProperty(this, "recentHistoryContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "recentPatientsContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "tipElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "recentPatientsSection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
    }
    render() {
        const appElement = document.getElementById('app');
        if (appElement) {
            appElement.innerHTML = HomeTemplate;
        }
        // Quitar la clase del splash para restaurar fondo original
        document.body.classList.remove('splash-body');
        this.setupElements();
    }
    setupElements() {
        this.recentHistoryContainer = document.getElementById('recent-history-container');
        this.recentPatientsContainer = document.getElementById('recent-patients-container');
        this.tipElement = document.getElementById('tip-of-the-day');
        this.recentPatientsSection = document.getElementById('recent-patients-section');
    }
    getRecentHistoryContainer() {
        return this.recentHistoryContainer;
    }
    getRecentPatientsContainer() {
        return this.recentPatientsContainer;
    }
    getTipElement() {
        return this.tipElement;
    }
    showRecentPatientsSection() {
        if (this.recentPatientsSection) {
            this.recentPatientsSection.style.display = 'block';
        }
    }
    getViewAllHistoryButton() {
        return document.getElementById('view-all-history');
    }
    getViewAllPatientsButton() {
        return document.getElementById('view-all-patients');
    }
    getModuleCards() {
        return document.querySelectorAll('.glass-card[data-route]');
    }
    getBottomNavLinks() {
        return document.querySelectorAll('nav a[data-route]');
    }
    getSearchButton() {
        return document.querySelector('button span[data-icon="search"]')?.parentElement || null;
    }
    getProfileButton() {
        return document.querySelector('button span[data-icon="account_circle"]')?.parentElement || null;
    }
}
