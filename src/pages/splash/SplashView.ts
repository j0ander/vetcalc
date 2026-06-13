import { SplashTemplate } from '@/templates/SplashTemplate'

export class SplashView {
  private progressBar: HTMLElement | null = null
  private messageElement: HTMLElement | null = null
  
  render(): void {
    const appElement = document.getElementById('app')
    if (appElement) {
      appElement.innerHTML = SplashTemplate
    }
    // Añadir clase para fondo verde y overflow hidden
    document.body.classList.add('splash-body')
    this.setupElements()
  }
  
  private setupElements(): void {
    this.progressBar = document.getElementById('progress-bar')
    this.messageElement = document.getElementById('splash-message')
  }
  
  updateProgress(percent: number): void {
    if (this.progressBar) {
      this.progressBar.style.width = `${percent}%`
    }
  }
  
  updateMessage(message: string): void {
    if (this.messageElement) {
      this.messageElement.textContent = message
    }
  }
}