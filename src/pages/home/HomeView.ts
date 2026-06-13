// src/pages/home/HomeView.ts (VERSIÓN SIN TIMEOUT)
import { HomeTemplate } from '@/templates/HomeTemplate'

export class HomeView {
  private recentHistoryContainer: HTMLElement | null = null
  private recentPatientsContainer: HTMLElement | null = null
  private tipElement: HTMLElement | null = null
  private recentPatientsSection: HTMLElement | null = null
  
  render(): void {
    const appElement = document.getElementById('app')
    if (appElement) {
      appElement.innerHTML = HomeTemplate
    }
    // Quitar la clase del splash para restaurar fondo original
    document.body.classList.remove('splash-body')
    this.setupElements()
  }
  
  private setupElements(): void {
    this.recentHistoryContainer = document.getElementById('recent-history-container')
    this.recentPatientsContainer = document.getElementById('recent-patients-container')
    this.tipElement = document.getElementById('tip-of-the-day')
    this.recentPatientsSection = document.getElementById('recent-patients-section')
  }
  
  getRecentHistoryContainer(): HTMLElement | null {
    return this.recentHistoryContainer
  }
  
  getRecentPatientsContainer(): HTMLElement | null {
    return this.recentPatientsContainer
  }
  
  getTipElement(): HTMLElement | null {
    return this.tipElement
  }
  
  showRecentPatientsSection(): void {
    if (this.recentPatientsSection) {
      this.recentPatientsSection.style.display = 'block'
    }
  }
  
  getViewAllHistoryButton(): HTMLElement | null {
    return document.getElementById('view-all-history')
  }
  
  getViewAllPatientsButton(): HTMLElement | null {
    return document.getElementById('view-all-patients')
  }
  
  getModuleCards(): NodeListOf<Element> {
    return document.querySelectorAll('.glass-card[data-route]')
  }
  
  getBottomNavLinks(): NodeListOf<Element> {
    return document.querySelectorAll('nav a[data-route]')
  }
  
  getSearchButton(): HTMLElement | null {
    return document.querySelector('button span[data-icon="search"]')?.parentElement || null
  }
  
  getProfileButton(): HTMLElement | null {
    return document.querySelector('button span[data-icon="account_circle"]')?.parentElement || null
  }
}