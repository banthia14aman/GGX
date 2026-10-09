import { useEffect, type ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { TbShoppingCart, TbX, TbHeart, TbHeartFilled, TbShieldCheck, TbTrash, TbHome, TbBuildingStore, TbSwords, TbUsers, TbUser, TbPlus } from 'react-icons/tb'
import { GiTwoCoins, GiCrossedSwords, GiSwapBag, GiStarMedal, GiPodium } from 'react-icons/gi'
import { photos, type PhotoKey } from './data/images'
import { cs2Meta, feed, findSeller, inr, type Item } from './data/catalog'
import { lineTotals, useStore } from './store'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" aria-label="GGX home" className={`group inline-flex items-baseline gap-1 ${className}`}>
      <span className="display text-3xl text-fg">GG</span>
      <span className="display text-3xl text-red glow-text transition-transform duration-200 group-hover:rotate-12">X</span>
    </Link>
  )
}

const NAV = [
  { to: '/market', label: 'Market' },
  { to: '/arena', label: 'Arena' },
  { to: '/squad', label: 'Squad' },
  { to: '/skin-lab', label: 'Skin Lab' },
]

export function TopBar({ onCart }: { onCart: () => void }) {
  const { cart, credits } = useStore()
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-4 md:px-6">
        <Logo />
        <span className="hidden items-center gap-2 rounded-sm border border-line px-2 py-1 text-xs font-medium text-muted lg:flex">
          <span className="live-dot" aria-hidden /> LIVE · IIT Delhi
        </span>
        <nav className="hidden flex-1 items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-red-text' : 'text-muted hover:text-fg'}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/sell" className="btn btn-line hidden !min-h-9 sm:inline-flex"><TbPlus aria-hidden /> Sell</Link>
          <Link to="/me" className="hidden items-center gap-1.5 px-2 text-sm text-muted hover:text-fg sm:flex" title="Gaming Credits">
            <GiTwoCoins className="text-warn" aria-hidden /> <span className="tabular font-semibold text-fg">{credits}</span><span className="sr-only">credits</span>
          </Link>
          <button onClick={onCart} className="btn btn-ghost relative !px-3" aria-label={`Cart, ${cart.length} items`}>
            <TbShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red px-1 text-[10px] font-bold text-ink">{cart.length}</span>
            )}
          </button>
          <Link to="/me" className="hidden h-9 w-9 place-items-center rounded-sm border border-line-strong text-xs font-bold md:grid" aria-label="Your Gamer Passport">P1</Link>
        </div>
      </div>
    </header>
  )
}

export function BottomTabs() {
  const tabs = [
    { to: '/', label: 'Home', icon: TbHome },
    { to: '/market', label: 'Market', icon: TbBuildingStore },
    { to: '/arena', label: 'Arena', icon: TbSwords },
    { to: '/squad', label: 'Squad', icon: TbUsers },
    { to: '/me', label: 'Me', icon: TbUser },
  ]
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-bg/95 backdrop-blur-sm md:hidden" aria-label="Tabs">
      {tabs.map(({ to, label, icon: I }) => (
        <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex h-16 flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${isActive ? 'text-red-text' : 'text-muted'}`}>
          <I size={22} aria-hidden /> {label}
        </NavLink>
      ))}
    </nav>
  )
}

const VERB_ICON = { rented: GiSwapBag, bought: GiSwapBag, traded: GiCrossedSwords, registered: GiPodium, listed: GiStarMedal }

export function KillFeed() {
  const row = [...feed, ...feed]
  return (
    <div className="overflow-hidden border-b border-line bg-surface" aria-label="Live campus activity">
      <div className="ticker">
        {row.map((f, i) => {
          const I = VERB_ICON[f.verb]
          return (
            <div key={i} className="flex shrink-0 items-center gap-2 border-r border-line px-5 py-2 text-xs" aria-hidden={i >= feed.length}>
              <span className="font-semibold text-fg">{f.a}</span>
              <I className="text-red-text" aria-label={f.verb} />
              <span className="text-muted">{f.verb}</span>
              <span className="font-medium text-fg">{f.what}</span>
              {f.b && <><span className="text-muted">from</span><span className="font-semibold text-fg">{f.b}</span></>}
              <span className="tabular text-muted">{f.ago}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Photo({ k, className = '', fit = 'cover', duo = true, hover = true, alt }: { k: PhotoKey; className?: string; fit?: 'cover' | 'contain'; duo?: boolean; hover?: boolean; alt?: string }) {
  const p = photos[k]
  return (
    <div className={`${duo ? 'duo' : 'bg-ink'} ${duo && hover ? 'duo-hover' : ''} ${className}`}>
      <img src={p.src} alt={alt ?? p.title.replace(/\.(jpg|png)$/i, '')} loading="lazy" className={`h-full w-full ${fit === 'contain' ? 'object-contain p-4' : 'object-cover'}`} />
    </div>
  )
}

export function ItemArt({ item, className = '', big = false }: { item: Item; className?: string; big?: boolean }) {
  if (item.art.type === 'cs2') {
    const m = cs2Meta(item.name)
    return (
      <div className={`relative grid place-items-center overflow-hidden bg-ink ${className}`}
        style={{ background: `radial-gradient(ellipse at 50% 60%, ${m.color}40, transparent 65%), var(--color-ink)` }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(135deg, var(--color-fg) 0 1px, transparent 1px 10px)' }} />
        <img src={m.image} alt={item.name} loading="lazy" className={`relative w-[82%] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-transform duration-500 ${big ? '' : 'group-hover:-rotate-3 group-hover:scale-105'}`} />
        <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: m.color, boxShadow: `0 0 16px ${m.color}` }} />
      </div>
    )
  }
  if (item.art.type === 'icon') {
    const I = item.art.icon
    return (
      <div className={`relative grid place-items-center overflow-hidden bg-ink ${className}`}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(var(--color-fg) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
        <div className="absolute h-1/2 w-1/2 rounded-full bg-red opacity-20 blur-3xl" />
        <I className="relative h-1/2 w-1/2 text-red-text drop-shadow-[0_0_18px_oklch(0.62_0.235_25/0.7)]" aria-hidden />
        <span className="absolute bottom-2 left-2 text-[10px] font-medium uppercase tracking-wider text-muted">Seller photos at handover</span>
      </div>
    )
  }
  // Products stay true-colour (buyers must see the real thing); duotone is for atmosphere photos only
  return <Photo k={item.art.key} fit={item.art.fit} duo={false} className={`${className} [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-105`} alt={item.name} />
}

export function RarityTag({ item }: { item: Item }) {
  if (item.kind !== 'cs2') return <span className="text-xs text-muted">{item.condition}</span>
  const m = cs2Meta(item.name)
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: m.color }}>
      <span className="h-2 w-2 rotate-45" style={{ background: m.color }} aria-hidden />
      {item.stattrak && <span className="text-warn">StatTrak™</span>}
      {m.rarity} · {item.wear}
    </span>
  )
}

export function WishButton({ id, className = '' }: { id: string; className?: string }) {
  const { wishlist, toggleWish } = useStore()
  const on = wishlist.includes(id)
  return (
    <button onClick={(e) => { e.preventDefault(); toggleWish(id) }} aria-pressed={on} aria-label={on ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`grid h-9 w-9 place-items-center rounded-sm bg-ink/80 transition-colors hover:text-red-text ${on ? 'text-red-text' : 'text-fg'} ${className}`}>
      {on ? <TbHeartFilled /> : <TbHeart />}
    </button>
  )
}

export function ItemCard({ item }: { item: Item }) {
  const seller = findSeller(item.seller)
  return (
    <Link to={`/item/${item.id}`} className="group hud flex flex-col border border-line bg-surface transition-colors hover:border-line-strong" style={{ ['--hud-color' as string]: item.kind === 'cs2' ? cs2Meta(item.name).color : undefined }}>
      <div className="relative">
        <ItemArt item={item} className="aspect-[4/3]" />
        <WishButton id={item.id} className="absolute right-2 top-2" />
        {item.mode !== 'buy' && <span className="tab-cut absolute left-0 top-3 bg-red py-1 pl-2 pr-4 text-[11px] font-bold uppercase tracking-wide text-ink">Rentable</span>}
        {item.kind === 'cs2' && (item.price ?? 0) >= 10000 && <span className="tab-cut absolute left-0 top-3 bg-warn py-1 pl-2 pr-4 text-[11px] font-bold uppercase tracking-wide text-ink">Grail</span>}
        {(item.price ?? item.rentPerDay ?? 0) <= 500 && <span className="absolute bottom-3 left-2 bg-ink/85 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ok">Pocket money</span>}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <RarityTag item={item} />
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug">{item.name}</h3>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-1 pt-2">
          <div className="tabular">
            {item.price != null && <div className="text-lg font-bold">{inr(item.price)}</div>}
            {item.rentPerDay != null && <div className={item.price != null ? 'text-xs text-muted' : 'text-lg font-bold'}>{inr(item.rentPerDay)}<span className="text-xs font-normal text-muted">/day</span></div>}
          </div>
          <div className="text-[11px] leading-tight text-muted sm:text-right">
            <div className="font-medium text-fg">{seller.handle}</div>
            <div>{seller.hostel} · {seller.trades ? `${seller.rec}% rec` : 'New seller'}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function SectionHead({ kicker, title, action }: { kicker?: string; title: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {kicker && <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-text"><span className="h-px w-6 bg-red" aria-hidden />{kicker}</div>}
        <h2 className="display text-5xl md:text-6xl">{title}</h2>
      </div>
      {action}
    </div>
  )
}

export function Guarantee({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-start gap-3 border border-ok/30 bg-ok/5 ${compact ? 'p-3' : 'p-4'}`}>
      <TbShieldCheck className="mt-0.5 shrink-0 text-ok" size={20} aria-hidden />
      <div className="text-sm">
        <div className="font-semibold text-ok">GGX Guarantee</div>
        <div className="text-muted">Not as described? Full refund within 48 hours of handover. Your money stays held until you confirm.</div>
      </div>
    </div>
  )
}

export function Toast() {
  const { toast } = useStore()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center px-4 md:bottom-8" role="status" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="plate flex items-center gap-3 bg-raised px-4 py-3 text-sm font-medium shadow-[0_0_30px_-8px_var(--color-red)]">
            <span className="live-dot" aria-hidden /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, item, removeFromCart } = useStore()
  const nav = useNavigate()
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open, onClose])
  const lines = cart.flatMap((l) => { const it = item(l.itemId); return it ? [{ l, it, t: lineTotals(l, it) }] : [] })
  const total = lines.reduce((a, x) => a + x.t.amount + x.t.deposit, 0)
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-ink/70" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside role="dialog" aria-label="Your loadout" className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-surface"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="display text-3xl">Your loadout</h2>
              <button onClick={onClose} className="btn btn-ghost !px-2" aria-label="Close cart"><TbX size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {lines.length === 0 ? (
                <div className="p-8 text-center">
                  <GiSwapBag className="mx-auto mb-3 text-5xl text-red-text" aria-hidden />
                  <p className="font-semibold">Loadout empty</p>
                  <p className="mt-1 text-sm text-muted">Gear you add to buy or rent lands here.</p>
                  <button onClick={() => { onClose(); nav('/market') }} className="btn btn-red mt-5">Browse the market</button>
                </div>
              ) : lines.map(({ l, it, t }) => (
                <div key={l.key} className="flex gap-3 border-b border-line p-4">
                  <ItemArt item={it} className="h-20 w-24 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{it.name}</div>
                    <div className="text-xs text-muted">{l.mode === 'rent' ? `Rent · ${l.days} day${l.days > 1 ? 's' : ''}${l.start ? ` from ${l.start}` : ''}` : it.kind === 'cs2' ? 'Buy · Steam trade' : 'Buy · campus handover'}</div>
                    <div className="tabular mt-1 text-sm font-bold">{inr(t.amount)}{t.deposit > 0 && <span className="font-normal text-muted"> + {inr(t.deposit)} deposit</span>}</div>
                  </div>
                  <button onClick={() => removeFromCart(l.key)} className="btn btn-ghost !px-2 self-start" aria-label={`Remove ${it.name}`}><TbTrash /></button>
                </div>
              ))}
            </div>
            {lines.length > 0 && (
              <div className="border-t border-line p-5">
                <div className="mb-4 flex justify-between text-sm"><span className="text-muted">Due now (deposits refundable)</span><span className="tabular text-lg font-bold">{inr(total)}</span></div>
                <button onClick={() => { onClose(); nav('/checkout') }} className="btn btn-red w-full">Checkout</button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line pb-24 md:pb-10">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 md:grid-cols-[1.2fr_2fr] md:px-6">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted">Good Game Exchange. The verified campus gaming economy for IIT Delhi. A Mobile Commerce course project (DMS, IIT Delhi): all listings, people and payments are demo data.</p>
        </div>
        <div className="text-xs leading-relaxed text-muted">
          <div className="mb-2 font-semibold uppercase tracking-wider text-fg">Credits</div>
          <p>Icons: <a className="underline hover:text-fg" href="https://game-icons.net" target="_blank" rel="noreferrer">game-icons.net</a> (CC BY 3.0) and Tabler Icons (MIT), via react-icons. CS2 item images: Valve Corporation, via the open ByMykel CSGO-API dataset, used for a non-commercial academic demo. GGX is not affiliated with Valve, Sony, Microsoft, Nintendo or any brand shown.</p>
          <p className="mt-2">Photos from Wikimedia Commons: {Object.values(photos).map((p, i) => (
            <span key={p.page}>{i > 0 && ' · '}<a className="underline hover:text-fg" href={p.page} target="_blank" rel="noreferrer">{p.title.replace(/\.(jpg|png)$/i, '')}</a> ({p.credit})</span>
          ))}</p>
        </div>
      </div>
    </footer>
  )
}
