import { LibraryTemplate } from '@/templates/LibraryTemplate';

export class LibraryView {
  private searchInput: HTMLInputElement | null = null;
  private filterButtons: NodeListOf<Element> | null = null;
  private resourceCards: NodeListOf<Element> | null = null;
  private resourceItems: NodeListOf<Element> | null = null;
  private guidelineCards: NodeListOf<Element> | null = null;
  private viewAllButtons: NodeListOf<Element> | null = null;
  private upgradeBtn: HTMLElement | null = null;

  render(): void {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = LibraryTemplate;
    }
    this.cacheElements();
  }

  private cacheElements(): void {
    this.searchInput = document.getElementById('search-input') as HTMLInputElement;
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.resourceCards = document.querySelectorAll('.resource-card');
    this.resourceItems = document.querySelectorAll('.resource-item');
    this.guidelineCards = document.querySelectorAll('.guideline-card');
    this.viewAllButtons = document.querySelectorAll('.view-all');
    this.upgradeBtn = document.getElementById('upgrade-btn');
  }

  getSearchInput(): HTMLInputElement | null { return this.searchInput; }
  getFilterButtons(): NodeListOf<Element> | null { return this.filterButtons; }
  getUpgradeBtn(): HTMLElement | null { return this.upgradeBtn; }

  onResourceClick(callback: (id: string) => void): void {
    this.resourceCards?.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        if (id) callback(id);
        this.animateClick(card);
      });
    });
    this.resourceItems?.forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        if (id) callback(id);
        this.animateClick(item);
      });
    });
    this.guidelineCards?.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        if (id) callback(id);
        this.animateClick(card);
      });
    });
  }

  onViewAll(callback: (section: string) => void): void {
    this.viewAllButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');
        if (section) callback(section);
      });
    });
  }

  onSearch(callback: (query: string) => void): void {
    this.searchInput?.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase();
      callback(query);
    });
  }

  onFilterChange(callback: (filter: string) => void): void {
    this.filterButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        // Actualizar estilo visual
        this.filterButtons?.forEach(b => {
          b.classList.remove('bg-secondary', 'text-on-secondary');
          b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
        });
        btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
        btn.classList.add('bg-secondary', 'text-on-secondary');
        callback(filter);
      });
    });
  }

  filterResources(query: string): void {
    const allElements = [...(this.resourceCards || []), ...(this.resourceItems || [])];
    allElements.forEach(el => {
      const text = el.textContent?.toLowerCase() || '';
      if (query === '' || text.includes(query)) {
        (el as HTMLElement).style.display = '';
      } else {
        (el as HTMLElement).style.display = 'none';
      }
    });
  }

  private animateClick(element: Element): void {
    element.classList.add('bg-surface-container-low');
    setTimeout(() => element.classList.remove('bg-surface-container-low'), 300);
  }
}