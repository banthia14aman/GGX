import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { TbArrowRight, TbArrowUpRight } from 'react-icons/tb'
import { GiCrosshair, GiPadlock, GiShakingHands, GiHourglass, GiCheckMark } from 'react-icons/gi'
import { ItemArt, ItemCard, Photo, SectionHead, RarityTag } from '../components'
import { cs2Meta, findItem, findSeller, inr, items, KINDS, lfg, tournaments, type Kind } from '../data/catalog'
import type { PhotoKey } from '../data/images'
import { useStore } from '../store'

const ease = [0.16, 1, 0.3, 1] as const
const rise = (d: number) => ({ initial: { y: 28, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8, delay: d, ease } })

const DROPS = ['navaja-knife-safari-mesh', 'ps5-slim', 'ak-47-redline', 'mobile-ctrl', 'awp-fever-dream', 'steam-deck', 'glock-18-water-elemental', 'f4-falcon', 'awp-duality', 'psvr2']
const CAT_ART: Record<Exclude<Kind, never>, PhotoKey | 'cs2'> = { cs2: 'cs2', console: 'ps5Room', controller: 'dualsense', mobile: 'mobileCtrl', wrap: 'ps5', pc: 'pcBuilds', vr: 'quest3' }

export default function Home() {
  const hero = findItem('navaja-knife-safari-mesh')!
  const heroMeta = cs2Meta(hero.name)
  return (
    <>
      {/* HERO: the stream is live */}
      <section className="relative isolate min-h-[88vh] overflow-hidden border-b border-line">
        <Photo k="heroStage" hover={false} className="scanlines absolute inset-0 -z-10 [&_img]:scale-105" alt="Esports arena stage with trophy and giant screens" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_40%,transparent_20%,var(--color-bg)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-bg to-transparent" />

        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 pb-28 pt-16 md:px-6 lg:grid-cols-[1.3fr_1fr] lg:pt-24">
          <div>
            <motion.div {...rise(0)} className="mb-6 inline-flex items-center gap-2 bg-red px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-ink">
              <span className="h-2 w-2 rounded-full bg-ink" aria-hidden /> Live on campus
            </motion.div>
            <h1 className="display text-[clamp(5rem,15vw,13rem)]">
              <motion.span {...rise(0.08)} className="block">Game</motion.span>
              <motion.span {...rise(0.16)} className="block text-red glow-text">Hard.</motion.span>
            </h1>
            <motion.p {...rise(0.3)} className="mt-6 max-w-xl text-lg text-fg/85">
              Buy, rent and trade gear with verified IIT Delhi gamers. CS2 skins from ₹220, PS5 rentals from ₹300 a day. Then squad up and take the trophy home.
            </motion.p>
            <motion.div {...rise(0.4)} className="mt-8 flex flex-wrap gap-3">
              <Link to="/market" className="btn btn-red !min-h-12 !px-6 text-base">Enter the market <TbArrowRight /></Link>
              <Link to="/arena/fury-bgmi" className="btn btn-line !min-h-12 !px-6 text-base">Esports Fury · 6 slots left</Link>
            </motion.div>
          </div>

          {/* Inspect panel: the featured drop */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.35, ease }} className="self-end">
            <Link to={`/item/${hero.id}`} className="group hud block border border-line bg-ink/80 p-4 backdrop-blur-[2px]" style={{ ['--hud-color' as string]: heroMeta.color }}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-[0.18em] text-red-text">Your first knife, under ₹5,000</span>
                <span className="tabular text-muted">{hero.watchers} watching</span>
              </div>
              <ItemArt item={hero} className="my-3 aspect-[16/9]" />
              <RarityTag item={hero} />
              <div className="mt-1 flex items-end justify-between gap-3">
                <div className="text-xl font-semibold">{hero.name}</div>
                <div className="tabular text-2xl font-bold">{inr(hero.price!)}</div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
                <span>Float {hero.float} · seller {findSeller(hero.seller).handle}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-red-text group-hover:underline">Inspect <TbArrowUpRight /></span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Broadcast lower-third */}
        <div className="absolute inset-x-0 bottom-0 border-t border-line bg-ink/90">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-8 gap-y-1 px-4 py-3 text-xs md:px-6">
            <span className="display text-xl text-red">GGX</span>
            {[['1,284', 'verified IITD gamers'], ['312', 'live listings'], ['₹4.2L', 'traded this week'], ['4', 'tournaments open']].map(([n, l]) => (
              <span key={l} className="text-muted"><span className="tabular mr-1.5 font-bold text-fg">{n}</span>{l}</span>
            ))}
            <span className="ml-auto text-muted/70">Demo figures</span>
          </div>
        </div>
      </section>

      {/* DROPS */}
      <section className="mx-auto max-w-[1400px] px-4 pt-20 md:px-6">
        <SectionHead kicker="Today's drops" title={<>Fresh on the <span className="text-red">market</span></>}
          action={<Link to="/market" className="btn btn-line">All {items.length} listings <TbArrowRight /></Link>} />
        <div className="noscroll -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6">
          {DROPS.map((id) => findItem(id)).map((it) => it && (
            <div key={it.id} className="w-[270px] shrink-0 snap-start"><ItemCard item={it} /></div>
          ))}
        </div>
      </section>

      <LoadoutSelect />
      <SkinLabTeaser />
      <ArenaBoard />
      <MatchRules />
      <SquadPreview />
      <FinalCall />
    </>
  )
}

function LoadoutSelect() {
  const [active, setActive] = useState<Kind>('cs2')
  const nav = useNavigate()
  const counts = (k: Kind) => items.filter((i) => i.kind === k).length
  const art = CAT_ART[active]
  const sample = items.find((i) => i.kind === active)!
  return (
    <section className="mx-auto mt-28 max-w-[1400px] px-4 md:px-6">
      <SectionHead kicker="Loadout select" title="Pick your class" />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <ul className="border-t border-line" role="list">
          {KINDS.filter((k) => k.id !== 'all').map((k) => {
            const on = active === k.id
            return (
              <li key={k.id}>
                <button onMouseEnter={() => setActive(k.id as Kind)} onFocus={() => setActive(k.id as Kind)} onClick={() => nav(`/market?kind=${k.id}`)}
                  className={`group flex w-full items-baseline justify-between border-b border-line py-3 text-left transition-colors ${on ? 'text-fg' : 'text-muted hover:text-fg'}`}>
                  <span className="display flex items-center gap-3 text-4xl md:text-5xl">
                    <GiCrosshair className={`text-2xl transition-all ${on ? 'text-red opacity-100' : 'opacity-0'}`} aria-hidden />
                    {k.label}
                  </span>
                  <span className="tabular text-sm">{counts(k.id as Kind).toString().padStart(2, '0')}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <motion.div key={active} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease }} className="hud relative min-h-[360px] border border-line">
          {art === 'cs2' ? <ItemArt item={sample} big className="absolute inset-0" /> : <Photo k={art} hover={false} fit={art === 'ps5' ? 'contain' : 'cover'} className="absolute inset-0" />}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/85 px-4 py-3">
            <span className="text-sm text-muted">From <span className="tabular font-semibold text-fg">{inr(Math.min(...items.filter((i) => i.kind === active).map((i) => i.rentPerDay ?? i.price ?? 0)))}</span></span>
            <Link to={`/market?kind=${active}`} className="inline-flex items-center gap-1 text-sm font-semibold text-red-text hover:underline">Browse <TbArrowRight /></Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SkinLabTeaser() {
  return (
    <section className="relative mt-28 overflow-hidden border-y border-line bg-surface">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-16 md:px-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-[15%] rounded-full bg-red opacity-25 blur-3xl" />
            <SkinnedPS5 pattern={CRIMSON} className="relative h-full w-full" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHead kicker="Skin Lab" title={<>Wrap it before<br />you <span className="text-red">buy it</span></>} />
          <p className="max-w-md text-fg/80">Preview student-made vinyl wraps on a real PS5 before you order. Crimson Carbon, Redline, Night Camo. Ships to your hostel, fitted at handover.</p>
          <Link to="/skin-lab" className="btn btn-red mt-6">Open the Skin Lab <TbArrowRight /></Link>
        </div>
      </div>
    </section>
  )
}

export const CRIMSON = 'repeating-linear-gradient(45deg, oklch(0.45 0.2 25) 0 6px, oklch(0.32 0.15 25) 6px 12px)'

export function SkinnedPS5({ pattern, className = 'relative' }: { pattern: string; className?: string }) {
  const src = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/PlayStation_5_and_DualSense_with_transparent_background.png/960px-PlayStation_5_and_DualSense_with_transparent_background.png'
  const mask = { WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' } as const
  return (
    // className must set positioning ('relative' or 'absolute'); both create the containing block
    <div className={className}>
      <img src={src} alt="PlayStation 5 with DualSense, previewed with a vinyl wrap" className="absolute inset-0 h-full w-full object-contain" crossOrigin="anonymous" />
      <div className="absolute inset-0 mix-blend-multiply transition-[background] duration-500" style={{ background: pattern, ...mask }} />
    </div>
  )
}

function ArenaBoard() {
  return (
    <section className="relative mt-28 overflow-hidden">
      <Photo k="crowd" hover={false} className="absolute inset-0 -z-10 opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/80 to-bg" />
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-6">
        <SectionHead kicker="Arena" title={<>Scoreboard: <span className="text-red">open slots</span></>}
          action={<Link to="/arena" className="btn btn-line">Full schedule <TbArrowRight /></Link>} />
        <div className="border border-line bg-ink/85">
          <div className="hidden grid-cols-[1.6fr_1fr_1.1fr_1fr_auto] gap-4 border-b border-line px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted md:grid">
            <span>Event</span><span>When</span><span>Slots</span><span>Entry</span><span className="w-28" />
          </div>
          {tournaments.map((t) => (
            <Link key={t.id} to={`/arena/${t.id}`} className="group grid grid-cols-1 items-center gap-2 border-b border-line px-5 py-4 transition-colors last:border-b-0 hover:bg-raised md:grid-cols-[1.6fr_1fr_1.1fr_1fr_auto] md:gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-red-text">{t.game}</div>
                <div className="display text-2xl">{t.name}</div>
              </div>
              <div className="text-sm text-muted">{t.when}<br />{t.venue}</div>
              <div>
                <div className="tabular mb-1 text-sm"><span className="font-bold">{t.filled}</span><span className="text-muted">/{t.slots} teams</span></div>
                <div className="h-1.5 bg-raised"><div className="h-full bg-red shadow-[0_0_10px_var(--color-red)]" style={{ width: `${(t.filled / t.slots) * 100}%` }} /></div>
              </div>
              <div className="text-sm"><span className={t.entry === 'Free' ? 'font-semibold text-ok' : 'font-semibold'}>{t.entry}</span><br /><span className="text-muted">{t.sponsor}</span></div>
              <span className="btn btn-line w-28 group-hover:border-red-text group-hover:text-red-text">Register</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function MatchRules() {
  const rules = [
    { icon: GiPadlock, t: 'Verified IITD only', d: 'Every account signs in with an @iitd.ac.in email. No randoms, no bots, no burner sellers.' },
    { icon: GiShakingHands, t: 'Money held until the scan', d: 'You pay GGX, not the seller. Cash moves only after you scan the seller\'s QR at handover.' },
    { icon: GiHourglass, t: 'CS2 trades are reversal-proof', d: 'Steam lets senders reverse trades for 7 days. GGX pays sellers on day 8, so a trade can never be clawed back from you.' },
    { icon: GiCheckMark, t: '48-hour GGX Guarantee', d: 'Not as described? Full refund. Deposits come back automatically when the gear does.' },
  ]
  return (
    <section className="mx-auto mt-28 max-w-[1400px] px-4 md:px-6">
      <SectionHead kicker="Rules of engagement" title={<>No scams. <span className="text-red">Just GGs.</span></>} />
      <ol className="grid gap-x-10 md:grid-cols-2">
        {rules.map((r, i) => (
          <li key={r.t} className="flex gap-5 border-t border-line py-6">
            <span className="display tabular text-5xl text-red/80">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold"><r.icon className="text-red-text" aria-hidden />{r.t}</h3>
              <p className="mt-1 max-w-md text-sm text-muted">{r.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function SquadPreview() {
  const { invited, invite } = useStore()
  return (
    <section className="mx-auto mt-28 max-w-[1400px] px-4 md:px-6">
      <SectionHead kicker="Squad" title={<>Need a <span className="text-red">fifth?</span></>} action={<Link to="/squad" className="btn btn-line">Find teammates <TbArrowRight /></Link>} />
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
        {lfg.slice(0, 4).map((p) => {
          const s = findSeller(p.seller)
          const on = invited.includes(p.id)
          return (
            <div key={p.id} className="flex items-center gap-4 bg-surface p-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center border border-line-strong font-bold">{s.name.slice(0, 2).toUpperCase()}</div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{s.handle} <span className="text-xs font-normal text-muted">· {s.hostel}</span></div>
                <div className="text-sm text-muted">{p.game} · {p.rank} · {p.role}</div>
                <div className="text-xs text-red-text">{p.window}</div>
              </div>
              <button onClick={() => invite(p.id)} disabled={on} className={`btn btn-line ${on ? 'opacity-60' : ''} !min-h-10`}>{on ? 'Invited' : 'Invite'}</button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function FinalCall() {
  const { notify } = useStore()
  const [email, setEmail] = useState('')
  const valid = /^[^@\s]+@([a-z0-9-]+\.)*iitd\.ac\.in$/i.test(email)
  return (
    <section className="relative mx-auto mt-28 max-w-[1400px] overflow-hidden px-4 md:px-6">
      <div className="hud relative border border-line bg-surface px-6 py-14 md:px-14">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red opacity-20 blur-3xl" />
        <h2 className="display max-w-3xl text-6xl md:text-8xl">GG starts with your <span className="text-red glow-text">IITD email.</span></h2>
        <form className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={(e) => { e.preventDefault(); notify(valid ? 'Demo: a 6-digit code would be emailed to ' + email : 'Use your @iitd.ac.in address') }}>
          <label htmlFor="email" className="sr-only">IIT Delhi email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kerberos@iitd.ac.in" className="field !min-h-12" autoComplete="email" />
          <button className="btn btn-red !min-h-12 !px-6">Get verified</button>
        </form>
        <p className="mt-3 text-xs text-muted">Only @iitd.ac.in addresses. Demo only: no email is sent.</p>
      </div>
    </section>
  )
}
