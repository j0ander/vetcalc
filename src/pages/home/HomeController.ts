// src/pages/home/HomeController.ts
import { HomeView } from './HomeView'
import { router, type Destroyable } from '@/services/RouterService'
import { mockDataService } from '@/services/MockDataService'
import { VET_TIPS } from '@/constants'
import type { AppRoute, Patient, CalculationRecord } from '@/types'
import { BaseController } from '@/controllers/BaseController'

export class HomeController extends BaseController implements Destroyable {
  private view: HomeView
  private onlineStatus: boolean = true

  private onlineHandler = (): void => {
    this.updateOnlineStatus(true)
  }

  private offlineHandler = (): void => {
    this.updateOnlineStatus(false)
  }

  constructor() {
    super() // Llama al constructor de BaseController
    this.view = new HomeView()
  }

  async init(): Promise<void> {
    this.view.render();

    // Efecto ripple en las tarjetas
    document.querySelectorAll('.glass-card').forEach((card) => {
      const htmlCard = card as HTMLElement;
      htmlCard.addEventListener('click', (mouseEvent: MouseEvent) => {
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

    // Navegación global (para cualquier elemento con data-route)
    this.setupGlobalNavigation();

    // Badge premium (color según suscripción)
    this.initPremiumBadge();
    // Listeners específicos (search, profile, view all)
  this.setupSpecificListeners();
    // Configuración específica de Home (que no usa data-route)
    this.setupElements();
    this.renderRecentPatients();
    this.renderRecentHistory();
    this.renderTipOfTheDay();
    this.setupConnectivityMonitoring();
    this.updateOnlineStatus(navigator.onLine);
  }

   destroy(): void {
    window.removeEventListener('online', this.onlineHandler)
    window.removeEventListener('offline', this.offlineHandler)
    this.destroyPremiumBadge();
    console.log('[HomeController] Destroyed')
  }

  // 👇 Método que faltaba (defínelo aquí)
  private setupSpecificListeners(): void {
    const searchBtn = this.view.getSearchButton();
    if (searchBtn) {
      searchBtn.addEventListener('click', () => console.log('[Home] Search clicked'));
    }
    const profileBtn = this.view.getProfileButton();
    if (profileBtn) {
      profileBtn.addEventListener('click', () => console.log('[Home] Profile clicked'));
    }
    const viewAllHistory = this.view.getViewAllHistoryButton();
    if (viewAllHistory) {
      viewAllHistory.addEventListener('click', async () => this.navigateToModule('history'));
    }
    const viewAllPatients = this.view.getViewAllPatientsButton();
    if (viewAllPatients) {
      viewAllPatients.addEventListener('click', async () => this.navigateToModule('patients'));
    }
  }

  private setupElements(): void {
    this.view.showRecentPatientsSection()
  }

  private async navigateToModule(route: AppRoute): Promise<void> {
    console.log(`[Home] Navigating to: ${route}`)
    await router.navigate(route)
  }

  private renderRecentPatients(): void {
    const patients = mockDataService.getRecentPatients(4)
    const container = this.view.getRecentPatientsContainer()
    if (!container) return
    container.innerHTML = ''
    patients.forEach(patient => {
      container.appendChild(this.createPatientCard(patient))
    })
  }

  private createPatientCard(patient: Patient): HTMLElement {
    const div = document.createElement('div')
    div.className = 'bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30'
    const speciesIcon = patient.species === 'canine' ? 'pets' : 'pets'
    div.innerHTML = `
      <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
        <span class="material-symbols-outlined">${speciesIcon}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(patient.name)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">${patient.species} • ${patient.weightKg}kg</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant capitalize">${patient.status}</span>
    `
    div.style.cursor = 'pointer'
    div.addEventListener('click', () => console.log(`[Home] View patient: ${patient.name}`))
    return div
  }

  private renderRecentHistory(): void {
    const history = mockDataService.getRecentHistory(2)
    const container = this.view.getRecentHistoryContainer()
    if (!container) return
    container.innerHTML = ''
    history.forEach(record => {
      container.appendChild(this.createHistoryItem(record))
    })
  }

  private createHistoryItem(record: CalculationRecord): HTMLElement {
    const div = document.createElement('div')
    div.className = 'bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-sm border border-outline-variant/30'

    let icon = 'history'
    let iconBgClass = 'bg-secondary-fixed'
    switch (record.type) {
      case 'dosage': icon = 'medication'; iconBgClass = 'bg-secondary-fixed'; break
      case 'fluidotherapy': icon = 'water_drop'; iconBgClass = 'bg-secondary-fixed'; break
      case 'anesthesia': icon = 'air'; iconBgClass = 'bg-tertiary-fixed'; break
      case 'converter': icon = 'sync_alt'; iconBgClass = 'bg-surface-container-highest'; break
    }

    const relativeTime = this.getRelativeTime(record.createdAt)
    const summaryText = record.summary.substring(0, 40) + (record.summary.length > 40 ? '...' : '')
    const patientName = record.patientName || 'Unknown'
    const patientSpecies = record.patientSpecies || 'N/A'
    const patientWeight = record.patientWeightKg || '?'

    div.innerHTML = `
      <div class="w-10 h-10 rounded-full ${iconBgClass} text-on-secondary-fixed flex items-center justify-center">
        <span class="material-symbols-outlined">${icon}</span>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-label-md text-on-surface">${this.escapeHtml(summaryText)}</p>
        <p class="font-label-sm text-label-sm text-on-surface-variant">Patient: ${this.escapeHtml(patientName)} (${patientSpecies}, ${patientWeight}kg)</p>
      </div>
      <span class="font-label-sm text-label-sm text-on-surface-variant">${relativeTime}</span>
    `
    div.style.cursor = 'pointer'
    div.addEventListener('click', () => console.log(`[Home] View calculation: ${record.type}`))
    return div
  }

  private getRelativeTime(date: Date): string {
    const diffMs = Date.now() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  private renderTipOfTheDay(): void {
    const randomTip = VET_TIPS[Math.floor(Math.random() * VET_TIPS.length)]
    const tipElement = this.view.getTipElement()
    if (tipElement) tipElement.textContent = randomTip.text
  }

  private setupConnectivityMonitoring(): void {
    window.addEventListener('online', this.onlineHandler)
    window.addEventListener('offline', this.offlineHandler)
  }

  private updateOnlineStatus(isOnline: boolean): void {
    this.onlineStatus = isOnline
    let statusIndicator = document.getElementById('online-status')
    if (!statusIndicator) {
      const header = document.querySelector('header')
      if (header) {
        statusIndicator = document.createElement('div')
        statusIndicator.id = 'online-status'
        statusIndicator.className = 'fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium transition-all duration-300'
        document.body.insertBefore(statusIndicator, document.body.firstChild)
      }
    }
    if (statusIndicator) {
      if (isOnline) {
        statusIndicator.textContent = '● Online'
        statusIndicator.className = 'fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-green-600 text-white transition-all duration-300'
        setTimeout(() => {
          if (statusIndicator && this.onlineStatus) {
            statusIndicator.style.opacity = '0'
            setTimeout(() => {
              if (statusIndicator && this.onlineStatus) {
                statusIndicator.style.display = 'none'
                const headerEl = document.querySelector('header')
                if (headerEl) headerEl.style.marginTop = '0px'
              }
            }, 300)
          }
        }, 3000)
      } else {
        statusIndicator.textContent = '⚠ You are offline - Some features may be limited'
        statusIndicator.className = 'fixed top-0 left-0 right-0 z-50 text-center text-xs py-0.5 font-medium bg-amber-600 text-white transition-all duration-300'
        statusIndicator.style.display = 'block'
        const headerEl = document.querySelector('header')
        if (headerEl) headerEl.style.marginTop = '24px'
      }
    }
  }

  private escapeHtml(str: string): string {
    const div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
  }
}