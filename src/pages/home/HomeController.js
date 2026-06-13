// src/pages/home/HomeController.ts (ACTUALIZADO CON DESTROYABLE)
import { HomeView } from './HomeView';
import { router } from '@/services/RouterService';
import { mockDataService } from '@/services/MockDataService';
import { VET_TIPS } from '@/constants';
export class HomeController {
    constructor() {
        Object.defineProperty(this, "view", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onlineStatus", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "onlineHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.updateOnlineStatus(true);
            }
        });
        Object.defineProperty(this, "offlineHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.updateOnlineStatus(false);
            }
        });
        this.view = new HomeView();
    }
    async init() {
        this.view.render();
        document.querySelectorAll('.glass-card').forEach((card) => {
            const htmlCard = card;
            htmlCard.addEventListener('click', (mouseEvent) => {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                htmlCard.appendChild(ripple);
                const rect = htmlCard.getBoundingClientRect();
                const x = mouseEvent.clientX - rect.left;
                const y = mouseEvent.clientY - rect.top;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                setTimeout(() => ripple.remove(), 600);
            });
        });
        this.setupElements();
        this.setupNavigation();
        this.renderRecentPatients();
        this.renderRecentHistory();
        this.renderTipOfTheDay();
        this.setupConnectivityMonitoring();
        this.updateOnlineStatus(navigator.onLine);
    }
    destroy() {
        window.removeEventListener('online', this.onlineHandler);
        window.removeEventListener('offline', this.offlineHandler);
        console.log('[HomeController] Destroyed');
    }
    setupElements() {
        this.view.showRecentPatientsSection();
    }
    setupNavigation() {
        const cards = this.view.getModuleCards();
        cards.forEach((card) => {
            const route = card.getAttribute('data-route');
            card.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (route) {
                    await this.navigateToModule(route);
                }
            });
        });
        const bottomNavLinks = this.view.getBottomNavLinks();
        bottomNavLinks.forEach((link) => {
            const route = link.getAttribute('data-route');
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (route && route !== 'home') {
                    await this.navigateToModule(route);
                }
            });
        });
        const searchBtn = this.view.getSearchButton();
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                console.log('[Home] Search clicked');
            });
        }
        const profileBtn = this.view.getProfileButton();
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                console.log('[Home] Profile clicked');
            });
        }
        const viewAllHistory = this.view.getViewAllHistoryButton();
        if (viewAllHistory) {
            viewAllHistory.addEventListener('click', async () => {
                await this.navigateToModule('history');
            });
        }
        const viewAllPatients = this.view.getViewAllPatientsButton();
        if (viewAllPatients) {
            viewAllPatients.addEventListener('click', async () => {
                await this.navigateToModule('patients');
            });
        }
    }
    async navigateToModule(route) {
        console.log(`[Home] Navigating to: ${route}`);
        await router.navigate(route);
    }
    renderRecentPatients() {
        const patients = mockDataService.getRecentPatients(4);
        const container = this.view.getRecentPatientsContainer();
        if (!container)
            return;
        container.innerHTML = '';
        patients.forEach(patient => {
            container.appendChild(this.createPatientCard(patient));
        });
    }
    createPatientCard(patient) {
        const div = document.createElement('div');
        div.className = 'bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30';
        const speciesIcon = patient.species === 'canine' ? 'pets' : 'pets';
        div.innerHTML = `
      <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
        <span class="material-symbols-outlined">${speciesIcon}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(patient.name)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">${patient.species} • ${patient.weightKg}kg</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant capitalize">${patient.status}</span>
    `;
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => console.log(`[Home] View patient: ${patient.name}`));
        return div;
    }
    renderRecentHistory() {
        const history = mockDataService.getRecentHistory(2);
        const container = this.view.getRecentHistoryContainer();
        if (!container)
            return;
        container.innerHTML = '';
        history.forEach(record => {
            container.appendChild(this.createHistoryItem(record));
        });
    }
    createHistoryItem(record) {
        const div = document.createElement('div');
        div.className = 'bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30';
        let icon = 'history';
        let iconBgClass = 'bg-secondary-fixed';
        switch (record.type) {
            case 'dosage':
                icon = 'medication';
                iconBgClass = 'bg-secondary-fixed';
                break;
            case 'fluidotherapy':
                icon = 'water_drop';
                iconBgClass = 'bg-secondary-fixed';
                break;
            case 'anesthesia':
                icon = 'air';
                iconBgClass = 'bg-tertiary-fixed';
                break;
            case 'converter':
                icon = 'sync_alt';
                iconBgClass = 'bg-surface-container-highest';
                break;
        }
        const relativeTime = this.getRelativeTime(record.createdAt);
        const summaryText = record.summary.substring(0, 40) + (record.summary.length > 40 ? '...' : '');
        const patientName = record.patientName || 'Unknown';
        const patientSpecies = record.patientSpecies || 'N/A';
        const patientWeight = record.patientWeightKg || '?';
        div.innerHTML = `
      <div class="w-10 h-10 rounded-full ${iconBgClass} text-on-secondary-fixed flex items-center justify-center">
        <span class="material-symbols-outlined">${icon}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(summaryText)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Patient: ${this.escapeHtml(patientName)} (${patientSpecies}, ${patientWeight}kg)</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant">${relativeTime}</span>
    `;
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => console.log(`[Home] View calculation: ${record.type}`));
        return div;
    }
    getRelativeTime(date) {
        const diffMs = Date.now() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        if (diffMins < 1)
            return 'Just now';
        if (diffMins < 60)
            return `${diffMins}m ago`;
        if (diffHours < 24)
            return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    }
    renderTipOfTheDay() {
        const randomTip = VET_TIPS[Math.floor(Math.random() * VET_TIPS.length)];
        const tipElement = this.view.getTipElement();
        if (tipElement)
            tipElement.textContent = randomTip.text;
    }
    setupConnectivityMonitoring() {
        window.addEventListener('online', this.onlineHandler);
        window.addEventListener('offline', this.offlineHandler);
    }
    updateOnlineStatus(isOnline) {
        this.onlineStatus = isOnline;
        let statusIndicator = document.getElementById('online-status');
        if (!statusIndicator) {
            const header = document.querySelector('header');
            if (header) {
                statusIndicator = document.createElement('div');
                statusIndicator.id = 'online-status';
                statusIndicator.className = 'fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium transition-all duration-300';
                document.body.insertBefore(statusIndicator, document.body.firstChild);
            }
        }
        if (statusIndicator) {
            if (isOnline) {
                statusIndicator.textContent = '● Online';
                statusIndicator.className = 'fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-green-600 text-white transition-all duration-300';
                setTimeout(() => {
                    if (statusIndicator && this.onlineStatus) {
                        statusIndicator.style.opacity = '0';
                        setTimeout(() => {
                            if (statusIndicator && this.onlineStatus) {
                                statusIndicator.style.display = 'none';
                                const headerEl = document.querySelector('header');
                                if (headerEl)
                                    headerEl.style.marginTop = '0px';
                            }
                        }, 300);
                    }
                }, 3000);
            }
            else {
                statusIndicator.textContent = '⚠ You are offline - Some features may be limited';
                statusIndicator.className = 'fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-amber-600 text-white transition-all duration-300';
                statusIndicator.style.display = 'block';
                const headerEl = document.querySelector('header');
                if (headerEl)
                    headerEl.style.marginTop = '24px';
            }
        }
    }
    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
