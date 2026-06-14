export function updatePremiumBadge(isPremium: boolean): void {
  const badges = document.querySelectorAll('.premium-badge');
  badges.forEach(badge => {
    if (isPremium) {
      badge.classList.remove('bg-surface-container-high', 'text-on-surface-variant', 'border-outline-variant');
      badge.classList.add('bg-tertiary-fixed', 'text-on-tertiary-fixed', 'border-tertiary');
    } else {
      badge.classList.remove('bg-tertiary-fixed', 'text-on-tertiary-fixed', 'border-tertiary');
      badge.classList.add('bg-surface-container-high', 'text-on-surface-variant', 'border-outline-variant');
    }
  });
}