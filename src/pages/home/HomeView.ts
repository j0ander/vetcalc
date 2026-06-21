import { HomeTemplate } from '@/templates/HomeTemplate'

export class HomeView {
  private recentHistoryContainer: HTMLElement | null = null
  private recentPatientsContainer: HTMLElement | null = null
  private tipElement: HTMLElement | null = null
  private recentPatientsSection: HTMLElement | null = null
  private greetingElement: HTMLElement | null = null
  private remindersContainer: HTMLElement | null = null
  private weightContainer: HTMLElement | null = null

  render(): void {
    const appElement = document.getElementById('app')
    if (appElement) {
      appElement.innerHTML = HomeTemplate
    }
    document.body.classList.remove('splash-body')
    this.setupElements()
  }

  private setupElements(): void {
    this.recentHistoryContainer = document.getElementById('recent-history-container')
    this.recentPatientsContainer = document.getElementById('recent-patients-container')
    this.tipElement = document.getElementById('tip-of-the-day')
    this.recentPatientsSection = document.getElementById('recent-patients-section')
    this.greetingElement = document.getElementById('greeting')
    this.remindersContainer = document.getElementById('reminders-container')
    this.weightContainer = document.getElementById('weight-container')
  }

  // Getters existentes
  getRecentHistoryContainer(): HTMLElement | null { return this.recentHistoryContainer }
  getRecentPatientsContainer(): HTMLElement | null { return this.recentPatientsContainer }
  getTipElement(): HTMLElement | null { return this.tipElement }
  showRecentPatientsSection(): void {
    if (this.recentPatientsSection) this.recentPatientsSection.style.display = 'block'
  }
  getViewAllHistoryButton(): HTMLElement | null { return document.getElementById('view-all-history') }
  getViewAllPatientsButton(): HTMLElement | null { return document.getElementById('view-all-patients') }
  getModuleCards(): NodeListOf<Element> { return document.querySelectorAll('.glass-card[data-route]') }
  getBottomNavLinks(): NodeListOf<Element> { return document.querySelectorAll('nav a[data-route]') }
  getSearchButton(): HTMLElement | null { return document.querySelector('button span[data-icon="search"]')?.parentElement || null }
  getProfileButton(): HTMLElement | null { return document.querySelector('button span[data-icon="account_circle"]')?.parentElement || null }

  // Nuevos getters para el nuevo diseño
  getGreetingElement(): HTMLElement | null { return this.greetingElement }
  getRemindersContainer(): HTMLElement | null { return this.remindersContainer }
  getWeightContainer(): HTMLElement | null { return this.weightContainer }

  // Métodos para renderizar recordatorios y peso
  renderReminders(reminders: { time: string; title: string; description: string }[]): void {
    if (!this.remindersContainer) return
    this.remindersContainer.innerHTML = ''
    reminders.forEach(reminder => {
      const card = document.createElement('div')
      card.className = 'bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center gap-4'
      card.innerHTML = `
        <div class="text-center min-w-[60px]">
          <span class="font-headline-md text-headline-md text-primary">${reminder.time}</span>
        </div>
        <div class="flex-1">
          <p class="font-label-md text-label-md font-bold text-on-surface">${reminder.title}</p>
          <p class="font-label-sm text-label-sm text-on-surface-variant">${reminder.description}</p>
        </div>
        <span class="material-symbols-outlined text-outline">chevron_right</span>
      `
      this.remindersContainer!.appendChild(card)
    })
  }

  renderWeightEntries(entries: { weight: number; date: string; change?: number }[]): void {
    if (!this.weightContainer) return
    this.weightContainer.innerHTML = ''
    entries.forEach(entry => {
      const card = document.createElement('div')
      card.className = 'bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_8px_rgba(38,50,56,0.08)] flex items-center justify-between'
      const changeText = entry.change ? (entry.change > 0 ? `+${entry.change}%` : `${entry.change}%`) : ''
      card.innerHTML = `
        <div>
          <span class="font-headline-md text-headline-md text-primary">${entry.weight} kg</span>
          <p class="font-label-sm text-label-sm text-on-surface-variant">${entry.date}</p>
        </div>
        ${changeText ? `<span class="font-label-sm text-label-sm ${entry.change && entry.change > 0 ? 'text-error' : 'text-secondary'}">${changeText}</span>` : ''}
      `
      this.weightContainer!.appendChild(card)
    })
  }
}