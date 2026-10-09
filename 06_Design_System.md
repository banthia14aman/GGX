# GGX Design System (v1)

> **Superseded on 2026-10-09.** The site moved to a dark-only, glowing-red "esports broadcast" look. The live tokens are in [ggx-web/src/index.css](ggx-web/src/index.css) (`@theme` block) and the strategy is in [PRODUCT.md](PRODUCT.md). The volt/violet palette below is kept only as a record of the earlier direction.

Date: 2026-10-09. Feeds Phase D (implementation). Files:
- [design-system/tokens.json](design-system/tokens.json): the source of truth (primitive → semantic → component).
- [design-system/tokens.css](design-system/tokens.css): generated CSS variables. Don't edit it; change `tokens.json` and regenerate.
- [design-system/preview.html](design-system/preview.html): visual check of tokens and components in both themes.

Regenerate after changing tokens:

```bash
node "<ui-ux-pro-max design-system skill>/scripts/generate-tokens.cjs" -c design-system/tokens.json -o design-system/tokens.css
```

## 1. Direction

**Founder's brief:** GGX should feel like a gaming product, not a college notice board, while still being trustworthy enough to hand over ₹10,000 deposits.

| Decision | Choice | Why |
|---|---|---|
| Theme | **Dark-first**, with a light theme available | Gaming apps are dark, and late-night use is assumed (the brief's 10 PM-2 AM peak, unsourced). Light mode is for daytime and for projectors in class |
| Action colour | **Volt** `#D4FF3A` (lime) | Distinctive among gaming brands (Steam blue, Twitch purple). Very high contrast with dark ink (17:1) |
| Event colour | **Violet** `#6D4AFF` | Separates Arena (compete) from Market (transact) at a glance |
| Display font | **Chakra Petch** | Angular, esports feel, for headings only |
| Body font | **Inter** | Highly legible at small sizes on phones |
| Mono font | **JetBrains Mono** | Handover codes and order IDs, where every character must be unambiguous |
| Shape | 8px controls, 14px cards, pill chips | Slightly sharp to match the display font, without looking harsh |

## 2. Token layers

```
Primitive  --primitive-color-volt-400: #D4FF3A     (raw value, never used directly in components)
   ↓
Semantic   --color-primary: volt-400                (purpose; changes per theme)
   ↓
Component  --button-bg: var(--color-primary)        (one component's setting)
```

**Rule:** components use semantic or component tokens only. A raw hex value in app code is a bug.

### Semantic colours

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--color-background` | `#F6F6F3` | `#0B0B10` | Page |
| `--color-surface` | `#FFFFFF` | `#16161D` | Cards, sheets |
| `--color-surface-raised` | `#F6F6F3` | `#22222B` | Inputs, nested boxes |
| `--color-foreground` | `#0B0B10` | `#F4F4F6` | Main text |
| `--color-muted-foreground` | `#5E5E6B` | `#9A9AA8` | Helper text |
| `--color-border` | `#E4E4E0` | `#2E2E39` | Dividers, outlines |
| `--color-primary` | `#D4FF3A` | `#D4FF3A` | Primary button **fill** only |
| `--color-primary-foreground` | `#0B0B10` | `#0B0B10` | Text on volt |
| `--color-link` | `#4A6B00` | `#D4FF3A` | Volt-family **text and outlines** (volt itself is unreadable on white) |
| `--color-arena` / `-foreground` | `#6D4AFF` / white | same | Arena buttons and highlights |
| `--color-arena-text` | `#5B3BE8` | `#9D86FF` | Violet text |
| `--color-success` | `#15803D` | `#4ADE80` | Completed, recommended, Guarantee |
| `--color-warning` | `#B45309` | `#FBBF24` | Overdue, due soon |
| `--color-danger` | `#DC2626` | `#F87171` | Disputes, errors, destructive actions |
| `--color-ring` | `#6D4AFF` | `#6D4AFF` | Keyboard focus outline |

**Contrast (WCAG 2.1), checked with a script:** every text pair is ≥4.5:1. The lowest is danger on white at 4.83:1; most are 6:1 or higher. Volt is used as a fill with dark text (16.98:1), never as text on a light background.

### Other scales

| Scale | Values |
|---|---|
| Font size | xs 12 · sm 14 · base 16 · lg 18 · xl 22 · 2xl 28 · 3xl 36 (px) |
| Spacing | 4 · 8 · 12 · 16 · 24 · 32 · 48 (px) |
| Radius | sm 4 · md 8 · lg 14 · full |
| Motion | fast 120ms · normal 200ms; turned off when the user sets `prefers-reduced-motion` |

## 3. Components

### Button

| Variant | Use | Default | Hover | Focus | Disabled |
|---|---|---|---|---|---|
| Primary (volt) | The one main action per screen: Pay, Rent, List | Volt fill, ink text | `volt-500` | 2px violet ring, 2px offset | 45% opacity, no pointer |
| Arena (violet) | Register, Check in | Violet fill, white text | Darker violet | Same ring | Same |
| Ghost | Secondary actions | Transparent, border | Surface-raised fill | Same ring | Same |
| Danger | Raise dispute, Remove listing | Danger outline + text | Danger tint | Same ring | Same |

Height is 44px everywhere, the minimum touch-target size on phones.

### Order status pill (maps the order state machine in the functional design, §5.1)

| State | Colour token |
|---|---|
| Pending payment, Cancelled | muted-foreground |
| Paid · held, Returned | link (volt family) |
| Active | arena-text |
| Overdue | warning |
| Completed | success |
| Disputed | danger |

Every pill shows text as well as colour, so status is never colour-only (accessibility).

### Other components

| Component | Spec |
|---|---|
| Card | Surface background, 1px border, 14px radius, 16px padding. No shadows in dark mode (they don't show); a light shadow is allowed in light mode |
| Input | 44px high, surface-raised background, 8px radius, violet focus ring. Labels always visible above the field (no placeholder-only labels) |
| Chip (filters) | Pill shape. Selected state: link-colour border and text |
| Tab bar (mobile) | 64px high, 5 tabs (Home, Market, Squad, Arena, Me). Active tab uses link colour + a label. Becomes a left sidebar at ≥1024px |
| QR panel | White background in **both** themes so scanners read it reliably. 6-digit mono code shown underneath as a fallback |
| Recommended badge | "92% recommended" in success colour; "New owner" in muted when there are fewer than 3 ratings |

## 4. Using it in the app (Next.js + Tailwind v4)

Import `tokens.css` once in the global stylesheet and expose the semantic tokens to Tailwind:

```css
@import "tailwindcss";
@import "../design-system/tokens.css";
@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-background: var(--color-background);
  --color-surface: var(--color-surface);
  --color-surface-raised: var(--color-surface-raised);
  --color-foreground: var(--color-foreground);
  --color-muted: var(--color-muted-foreground);
  --color-line: var(--color-border);
  --color-primary: var(--color-primary);
  --color-primary-fg: var(--color-primary-foreground);
  --color-link: var(--color-link);
  --color-arena: var(--color-arena);
  --color-arena-text: var(--color-arena-text);
  --color-success: var(--color-success);
  --color-warning: var(--color-warning);
  --color-danger: var(--color-danger);
  --font-display: var(--primitive-font-display);
  --font-sans: var(--primitive-font-body);
  --font-mono: var(--primitive-font-mono);
}
```

Then write classes such as `bg-primary text-primary-fg`, `text-muted` and `border-line`.

**Theme switching:** the token generator outputs dark mode under a `.dark` class. The app adds `.dark` to `<html>` by default (dark-first) and a toggle in "Me" switches it, remembered per device. Fonts load through `next/font/google`, so no external font request is made at runtime.

## 5. Rules for Phase D

1. One volt (primary) button per screen. Everything else is ghost or arena.
2. Never put volt text on a light background; use `link`.
3. Status always uses text + colour, never colour alone.
4. 44px minimum touch targets; visible focus ring on everything interactive.
5. QR codes always sit on white.
6. No raw hex values in components; use tokens only.
