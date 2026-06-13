// src/pages/splash/SplashController.ts
import { SplashView } from './SplashView'
import { router } from '@/services/RouterService'
import { SPLASH_DURATION_MS, SPLASH_MESSAGES } from '@/constants'

export class SplashController {
  private view: SplashView
  private progress: number = 0
  private messageIndex: number = 0
  private intervalId: number | null = null

  constructor() {
    this.view = new SplashView()
  }

  async init(): Promise<void> {
    this.view.render()
    await this.startLoading()
  }

  private startLoading(): Promise<void> {
    return new Promise((resolve) => {
      const startTime = Date.now()

      this.intervalId = window.setInterval(() => {
        const elapsed = Date.now() - startTime

        this.progress = Math.min(
          100,
          (elapsed / SPLASH_DURATION_MS) * 100
        )

        this.view.updateProgress(this.progress)

        if (
          Math.floor(elapsed / 700) > this.messageIndex &&
          this.messageIndex < SPLASH_MESSAGES.length - 1
        ) {
          this.messageIndex++
          this.view.updateMessage(
            SPLASH_MESSAGES[this.messageIndex]
          )
        }

        if (elapsed >= SPLASH_DURATION_MS) {
          this.complete(resolve)
        }
      }, 16)
    })
  }

  private async complete(resolve: () => void): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    this.view.updateProgress(100)
    this.view.updateMessage('Ready!')

    // Small delay for visual feedback
    await new Promise(resolveTimeout => setTimeout(resolveTimeout, 300))

    resolve()

    // Navigate to home after splash completes
    await router.navigate('home')
  }
}