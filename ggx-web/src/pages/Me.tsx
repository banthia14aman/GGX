import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { TbShieldCheck, TbRefresh } from 'react-icons/tb'
import { GiTwoCoins, GiStarMedal, GiLaurelsTrophy, GiFlame, GiCrossedSwords } from 'react-icons/gi'
import { ItemArt, ItemCard } from '../components'
import { findItem, inr, tournaments } from '../data/catalog'
import { ME, STAGES, useStore } from '../store'

const COSMETICS = [
  { name: 'Ember frame', cost: 10, icon: GiFlame },
  { name: 'Clutch badge', cost: 25, icon: GiStarMedal },
  { name: 'Duelist banner', cost: 40, icon: GiCrossedSwords },
]

export default function Me() {
  const { orders, passes, credits, wishlist, item, notify, reset, listings } = useStore()
  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-10 md:px-6">
      <div className="hud grid gap-6 border border-line bg-surface p-6 md:grid-cols-[auto_1fr_auto] md:items-center">
        <div className="grid h-24 w-24 place-items-center border-2 border-red text-3xl font-black shadow-[0_0_30px_-8px_var(--color-red)]">P1</div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Gamer Passport</div>
          <h1 className="display text-5xl">{ME.handle}</h1>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 border border-ok/40 px-2 py-1 text-ok"><TbShieldCheck /> Verified IITD</span>
            <span className="border border-line-strong px-2 py-1">{ME.hostel}</span>
            <span className="border border-line-strong px-2 py-1">Tier {ME.tier}: 3 clean trades to unlock lower deposits</span>
          </div>
        </div>
        <div className="flex items-center gap-3 border border-line px-5 py-3">
          <GiTwoCoins className="text-3xl text-warn" aria-hidden />
          <div><div className="tabular text-3xl font-bold">{credits}</div><div className="text-xs text-muted">Gaming Credits</div></div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <h2 className="display mb-4 text-4xl">Orders</h2>
          {orders.length ? (
            <div className="border border-line">
              {orders.map((o) => {
                const it = item(o.line.itemId)
                if (!it) return null
                const st = STAGES[o.track]
                return (
                  <Link key={o.id} to={`/order/${o.id}`} className="flex items-center gap-4 border-b border-line p-4 last:border-b-0 hover:bg-raised">
                    <ItemArt item={it} className="h-16 w-20 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">{it.name}</div>
                      <div className="text-xs text-muted"><span className="font-mono">{o.id}</span> · {inr(o.amount)}</div>
                    </div>
                    <span className={`text-right text-xs font-semibold ${o.stage === st.length - 1 ? 'text-ok' : 'text-red-text'}`}>{st[o.stage]}</span>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="border border-line p-8 text-center text-muted">No orders yet. <Link to="/market" className="text-red-text underline">Hit the market</Link>.</div>
          )}

          {listings.length > 0 && (
            <>
              <h2 className="display mb-4 mt-10 text-4xl">Your listings</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">{listings.map((l) => <ItemCard key={l.id} item={l} />)}</div>
            </>
          )}

          <h2 className="display mb-4 mt-10 text-4xl">Wishlist</h2>
          {wishlist.length ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">{wishlist.map((id) => { const it = findItem(id); return it && <ItemCard key={id} item={it} /> })}</div>
          ) : <p className="text-muted">Tap the heart on any listing to get price-drop pings.</p>}
        </section>

        <aside className="space-y-10">
          <section>
            <h2 className="display mb-4 text-4xl">Pass wallet</h2>
            {passes.length ? passes.map((p) => {
              const t = tournaments.find((x) => x.id === p.tournamentId)
              return (
                <Link key={p.id} to={`/arena/${p.tournamentId}`} className="mb-3 flex items-center gap-4 border border-line bg-surface p-4 hover:border-line-strong">
                  <div className="bg-white p-1.5"><QRCodeSVG value={`ggx://pass/${p.id}`} size={64} bgColor="#ffffff" fgColor="#0d0808" /></div>
                  <div><div className="font-semibold">{t?.name}</div><div className="text-xs text-muted">{p.team} · {t?.when}</div></div>
                </Link>
              )
            }) : <div className="border border-line p-6 text-sm text-muted"><GiLaurelsTrophy className="mb-2 text-3xl text-red-text" aria-hidden />No passes yet. <Link to="/arena" className="text-red-text underline">Register for a tournament</Link>.</div>}
          </section>

          <section>
            <h2 className="display mb-1 text-4xl">Credits shop</h2>
            <p className="mb-4 text-sm text-muted">Earned by lending on time, coaching and casting. Never bought, never cashed out.</p>
            <div className="border border-line">
              {COSMETICS.map((c) => (
                <div key={c.name} className="flex items-center gap-3 border-b border-line p-3 last:border-b-0">
                  <c.icon className="text-2xl text-red-text" aria-hidden />
                  <span className="flex-1 font-medium">{c.name}</span>
                  <button onClick={() => notify(credits >= c.cost ? `Demo: ${c.name} equipped` : `Need ${c.cost - credits} more credits`)} className="btn btn-line !min-h-9"><GiTwoCoins className="text-warn" /> {c.cost}</button>
                </div>
              ))}
            </div>
          </section>

          <button onClick={reset} className="btn btn-ghost"><TbRefresh /> Reset demo data</button>
        </aside>
      </div>
    </div>
  )
}
