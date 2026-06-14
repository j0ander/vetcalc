import { PremiumTemplate } from '@/templates/PremiumTemplate';

export class PremiumView {
  private monthlyBtn: HTMLElement | null = null;
  private annualBtn: HTMLElement | null = null;
  private pricingLabel: HTMLElement | null = null;
  private pricingPeriod: HTMLElement | null = null;
  private upgradeBtn: HTMLElement | null = null;
  private restoreBtn: HTMLElement | null = null;

  render(): void {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = PremiumTemplate;
    }
    this.cacheElements();
  }

  private cacheElements(): void {
    this.monthlyBtn = document.getElementById('monthly-toggle');
    this.annualBtn = document.getElementById('annual-toggle');
    this.pricingLabel = document.getElementById('pricing-label');
    this.pricingPeriod = document.getElementById('pricing-period');
    this.upgradeBtn = document.getElementById('upgrade-btn');
    this.restoreBtn = document.getElementById('restore-btn');
  }

  getMonthlyBtn(): HTMLElement | null { return this.monthlyBtn; }
  getAnnualBtn(): HTMLElement | null { return this.annualBtn; }
  getPricingLabel(): HTMLElement | null { return this.pricingLabel; }
  getPricingPeriod(): HTMLElement | null { return this.pricingPeriod; }
  getUpgradeBtn(): HTMLElement | null { return this.upgradeBtn; }
  getRestoreBtn(): HTMLElement | null { return this.restoreBtn; }

  setMonthlyActive(): void {
    this.monthlyBtn?.classList.add('bg-white', 'shadow-sm', 'text-primary');
    this.monthlyBtn?.classList.remove('text-on-surface-variant');
    this.annualBtn?.classList.remove('bg-white', 'shadow-sm', 'text-primary');
    this.annualBtn?.classList.add('text-on-surface-variant');
    if (this.pricingLabel) this.pricingLabel.innerText = '$9.99';
    if (this.pricingPeriod) this.pricingPeriod.innerText = '/ mes';
  }

  setAnnualActive(): void {
    this.annualBtn?.classList.add('bg-white', 'shadow-sm', 'text-primary');
    this.annualBtn?.classList.remove('text-on-surface-variant');
    this.monthlyBtn?.classList.remove('bg-white', 'shadow-sm', 'text-primary');
    this.monthlyBtn?.classList.add('text-on-surface-variant');
    if (this.pricingLabel) this.pricingLabel.innerText = '$95.88';
    if (this.pricingPeriod) this.pricingPeriod.innerText = '/ año';
  }
}