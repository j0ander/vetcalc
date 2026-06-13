// ─── DOM Helpers ──────────────────────────────────────────────────────────────

export function qs<T extends Element = Element>(selector: string, root: Document | Element = document): T | null {
  return root.querySelector<T>(selector)
}

export function qsAll<T extends Element = Element>(selector: string, root: Document | Element = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector))
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  innerHTML?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag)
  if (className) el.className = className
  if (innerHTML) el.innerHTML = innerHTML
  return el
}

// ─── String Helpers ───────────────────────────────────────────────────────────

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function timeAgo(date: Date): string {
  const diffMs = Date.now() - date.getTime()
  const diffMins = Math.floor(diffMs / 60_000)
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  return `${Math.floor(diffHours / 24)}d ago`
}

// ─── Array Helpers ────────────────────────────────────────────────────────────

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

// ─── Number Helpers ───────────────────────────────────────────────────────────

export function round(value: number, decimals = 2): number {
  return Math.round(value * 10 ** decimals) / 10 ** decimals
}

// ─── Tailwind / CSS Helpers ───────────────────────────────────────────────────

export function injectTailwindConfig(): void {
  const script = document.createElement('script')
  script.id = 'tailwind-config-runtime'
  script.textContent = `
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "on-tertiary-fixed-variant": "#544600",
            "on-primary-fixed-variant": "#005312",
            "on-surface-variant": "#40493d",
            "tertiary": "#705d00",
            "surface-container-low": "#e9f6fd",
            "error": "#ba1a1a",
            "on-secondary-fixed-variant": "#005313",
            "on-tertiary-container": "#4c3e00",
            "surface": "#f4faff",
            "surface-container-highest": "#d7e4ec",
            "surface-container-high": "#ddeaf2",
            "inverse-surface": "#263238",
            "secondary": "#006e1c",
            "primary-fixed-dim": "#88d982",
            "on-error-container": "#93000a",
            "on-primary": "#ffffff",
            "on-secondary-container": "#00731e",
            "on-tertiary": "#ffffff",
            "on-tertiary-fixed": "#221b00",
            "surface-dim": "#cfdce4",
            "surface-tint": "#1b6d24",
            "on-background": "#111d23",
            "outline": "#707a6c",
            "secondary-fixed-dim": "#78dc77",
            "inverse-primary": "#88d982",
            "on-primary-container": "#cbffc2",
            "primary": "#0d631b",
            "outline-variant": "#bfcaba",
            "tertiary-container": "#c9a900",
            "tertiary-fixed": "#ffe16d",
            "surface-bright": "#f4faff",
            "on-error": "#ffffff",
            "on-primary-fixed": "#002204",
            "secondary-container": "#91f78e",
            "surface-container": "#e3f0f8",
            "surface-variant": "#d7e4ec",
            "inverse-on-surface": "#e6f3fb",
            "on-secondary-fixed": "#002204",
            "on-surface": "#111d23",
            "tertiary-fixed-dim": "#e9c400",
            "surface-container-lowest": "#ffffff",
            "primary-container": "#2e7d32",
            "error-container": "#ffdad6",
            "secondary-fixed": "#94f990",
            "background": "#f4faff",
            "on-secondary": "#ffffff",
            "primary-fixed": "#a3f69c"
          },
          borderRadius: {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
          spacing: {
            "touch-target-min": "48px",
            "base": "8px",
            "stack-lg": "24px",
            "gutter": "12px",
            "container-padding": "16px",
            "stack-sm": "4px",
            "stack-md": "16px"
          },
          fontFamily: {
            "label-sm": ["Inter"],
            "body-md": ["Source Sans 3"],
            "headline-lg-mobile": ["Inter"],
            "headline-lg": ["Inter"],
            "label-md": ["Inter"],
            "body-lg": ["Source Sans 3"],
            "headline-md": ["Inter"],
            "headline-xl": ["Inter"]
          },
          fontSize: {
            "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "600"}],
            "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
            "headline-lg-mobile": ["22px", {"lineHeight": "28px", "fontWeight": "600"}],
            "headline-lg": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
            "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "500"}],
            "body-lg": ["18px", {"lineHeight": "26px", "fontWeight": "400"}],
            "headline-md": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
            "headline-xl": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}]
          }
        }
      }
    }
  `
  document.head.appendChild(script)
}