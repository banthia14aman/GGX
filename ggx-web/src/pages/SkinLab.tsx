import { useState } from 'react'
import { TbShoppingCart } from 'react-icons/tb'
import { SectionHead } from '../components'
import { inr } from '../data/catalog'
import { useStore } from '../store'
import { CRIMSON, SkinnedPS5 } from './Home'

const FINISHES = [
  { name: 'Crimson Carbon', price: 1899, bg: CRIMSON },
  { name: 'Redline', price: 1699, bg: 'linear-gradient(115deg, oklch(0.3 0.02 20) 0 38%, oklch(0.6 0.23 25) 38% 46%, oklch(0.95 0 0) 46% 48%, oklch(0.6 0.23 25) 48% 56%, oklch(0.3 0.02 20) 56%)' },
  { name: 'Night Camo', price: 1799, bg: 'radial-gradient(circle at 20% 30%, oklch(0.35 0.03 20) 0 14%, transparent 15%), radial-gradient(circle at 70% 60%, oklch(0.45 0.12 25) 0 12%, transparent 13%), radial-gradient(circle at 40% 80%, oklch(0.25 0.02 20) 0 18%, transparent 19%), radial-gradient(circle at 85% 20%, oklch(0.55 0.02 20) 0 10%, transparent 11%), oklch(0.62 0.02 20)' },
  { name: 'Molten', price: 2199, bg: 'conic-gradient(from 200deg at 60% 40%, oklch(0.65 0.22 40), oklch(0.5 0.24 25), oklch(0.3 0.12 20), oklch(0.65 0.22 40))' },
  { name: 'Ghost White', price: 1499, bg: 'linear-gradient(oklch(1 0 0), oklch(1 0 0))' },
]

export default function SkinLab() {
  const [pick, setPick] = useState(FINISHES[0])
  const { notify, addToCart } = useStore()
  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-10 md:px-6">
      <SectionHead kicker="Skin Lab" title={<>Try a wrap on a <span className="text-red">real PS5</span></>} />
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="hud relative aspect-square border border-line bg-[radial-gradient(circle_at_50%_55%,oklch(0.25_0.06_25),var(--color-ink)_70%)]">
          <SkinnedPS5 pattern={pick.bg} className="absolute inset-[6%]" />
          <span className="absolute bottom-3 left-3 text-xs text-muted">Live preview on the real console photo</span>
        </div>
        <div>
          <div className="text-sm text-muted">Finish</div>
          <div className="display text-5xl">{pick.name}</div>
          <div className="tabular mt-2 text-3xl font-bold">{inr(pick.price)}</div>
          <p className="mt-3 text-fg/80">Precut 3M cast vinyl for the PS5 Slim disc console and two DualSense controllers, made by a student seller in Himadri. Fitted free at handover.</p>
          <div className="mt-6 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Wrap finish">
            {FINISHES.map((f) => (
              <button key={f.name} role="radio" aria-checked={pick.name === f.name} aria-label={f.name} onClick={() => setPick(f)}
                className={`aspect-square border-2 transition-shadow ${pick.name === f.name ? 'border-red shadow-[0_0_18px_-4px_var(--color-red)]' : 'border-line-strong'}`} style={{ background: f.bg }} />
            ))}
          </div>
          <button onClick={() => pick.name === 'Crimson Carbon' ? addToCart({ itemId: 'wrap-crimson', mode: 'buy', days: 1 }) : notify(`${pick.name} is made to order: the seller will confirm within a day`)} className="btn btn-red mt-6 w-full !min-h-12"><TbShoppingCart /> Order this wrap</button>
          <p className="mt-3 text-xs text-muted">Physical vinyl only. Digital PlayStation, Valorant and BGMI skins are tied to accounts and cannot be traded.</p>
        </div>
      </div>
    </div>
  )
}
