import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { TbCalendar, TbMapPin, TbUsers, TbChevronLeft, TbInfoCircle } from 'react-icons/tb'
import { GiLaurelsTrophy, GiPodium } from 'react-icons/gi'
import { Photo, SectionHead } from '../components'
import { tournaments } from '../data/catalog'
import { useStore } from '../store'

export function Arena() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-10 md:px-6">
      <SectionHead kicker="Arena" title={<>Compete on <span className="text-red">campus</span></>} />
      <div className="grid gap-6 md:grid-cols-2">
        {tournaments.map((t, i) => (
          <Link key={t.id} to={`/arena/${t.id}`} className={`group hud relative flex min-h-[340px] flex-col justify-end overflow-hidden border border-line ${i === 0 ? 'md:col-span-2 md:min-h-[420px]' : ''}`}>
            <Photo k={t.photo} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
            <div className="relative p-6">
              <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="bg-red px-2 py-1 uppercase tracking-wider text-ink">{t.game}</span>
                <span className={`border px-2 py-1 ${t.status === 'Filling fast' ? 'border-warn text-warn' : 'border-line-strong text-fg'}`}>{t.status}</span>
                <span className="border border-line-strong px-2 py-1">{t.entry}</span>
              </div>
              <h2 className={`display ${i === 0 ? 'text-6xl md:text-8xl' : 'text-5xl'}`}>{t.name}</h2>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-fg/80">
                <span className="inline-flex items-center gap-1.5"><TbCalendar aria-hidden />{t.when}</span>
                <span className="inline-flex items-center gap-1.5"><TbMapPin aria-hidden />{t.venue}</span>
                <span className="tabular inline-flex items-center gap-1.5"><TbUsers aria-hidden />{t.filled}/{t.slots} teams</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const SEED = ['Night Owls', 'Kumaon Kings', 'Aravali Assassins', 'Zanskar Zero', 'LHC Lurkers', 'Girnar Ghosts', 'Satpura Snipers', 'Nilgiri Nades']

export function Tournament() {
  const { id = '' } = useParams()
  const { passes, register, notify } = useStore()
  const t = tournaments.find((x) => x.id === id)
  const [team, setTeam] = useState('')
  const pass = passes.find((p) => p.tournamentId === id)
  if (!t) return <div className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="display text-5xl">Event not found</h1><Link to="/arena" className="btn btn-red mt-6">Arena</Link></div>
  const left = t.slots - t.filled

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-line">
        <Photo k={t.photo} hover={false} className="scanlines absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
        <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-8 md:px-6">
          <Link to="/arena" className="mb-16 inline-flex items-center gap-1 text-sm text-fg/80 hover:text-fg"><TbChevronLeft /> Arena</Link>
          <span className="bg-red px-2 py-1 text-xs font-bold uppercase tracking-wider text-ink">{t.game}</span>
          <h1 className="display mt-4 text-7xl md:text-9xl">{t.name}</h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-fg/85">
            <span className="inline-flex items-center gap-1.5"><TbCalendar />{t.when}</span>
            <span className="inline-flex items-center gap-1.5"><TbMapPin />{t.venue}</span>
            <span>Sponsored by <b>{t.sponsor}</b> (fictional)</span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 pt-10 md:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <dl className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {[['Format', t.format], ['Slots left', `${left} of ${t.slots}`], ['Entry', t.entry], ['Prizes', t.prize]].map(([k, v]) => (
              <div key={k} className="bg-surface p-4"><dt className="text-xs uppercase tracking-wider text-muted">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>
            ))}
          </dl>

          <h2 className="display mb-4 mt-12 text-4xl">Bracket preview</h2>
          <div className="noscroll overflow-x-auto">
            <div className="grid min-w-[640px] grid-cols-3 gap-6">
              {[0, 1, 2].map((round) => {
                const n = 4 >> round
                return (
                  <div key={round} className="flex flex-col justify-around gap-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted">{['Quarter-finals', 'Semi-finals', 'Final'][round]}</div>
                    {Array.from({ length: n }, (_, m) => {
                      const a = round === 0 ? SEED[m * 2] : 'TBD'
                      const b = round === 0 ? SEED[m * 2 + 1] : 'TBD'
                      return (
                        <div key={m} className="border border-line bg-surface text-sm">
                          {[a, b].map((x, j) => (
                            <div key={j} className={`flex justify-between px-3 py-2 ${j ? 'border-t border-line' : ''} ${x === 'TBD' ? 'text-muted' : ''}`}><span>{x}</span><span className="tabular text-muted">-</span></div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-10 flex gap-3 border border-line p-4 text-sm text-muted">
            <TbInfoCircle className="mt-0.5 shrink-0 text-red-text" size={18} aria-hidden />
            <p>Prizes are funded by sponsors. Any fee covers venue costs only and is never linked to winnings, and there are no stakes or wagers, in line with the Online Gaming Act 2025.</p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {pass ? (
            <div className="hud border border-line bg-surface p-6 text-center">
              <GiLaurelsTrophy className="mx-auto text-4xl text-warn" aria-hidden />
              <div className="display mt-2 text-3xl">You're in, {pass.team}</div>
              <div className="mx-auto mt-5 w-fit bg-white p-3"><QRCodeSVG value={`ggx://pass/${pass.id}`} size={170} bgColor="#ffffff" fgColor="#0d0808" /></div>
              <div className="mt-3 font-mono text-sm text-muted">{pass.id} · single use</div>
              <p className="mt-3 text-sm text-muted">Show this at the door. It also lives in your Passport wallet.</p>
            </div>
          ) : (
            <form className="hud border border-line bg-surface p-6" onSubmit={(e) => { e.preventDefault(); if (!team.trim()) return notify('Name your squad first'); register(t.id, team.trim()); notify('Registered. Passes sent to your squad.') }}>
              <GiPodium className="text-4xl text-red-text" aria-hidden />
              <h2 className="display mt-2 text-4xl">Register your squad</h2>
              <p className="mt-1 text-sm text-muted"><span className="tabular font-semibold text-fg">{left}</span> slots left. Teammates must be verified IITD players.</p>
              <label htmlFor="team" className="label mt-5">Squad name</label>
              <input id="team" value={team} onChange={(e) => setTeam(e.target.value)} placeholder="e.g. Girnar Ghosts" className="field" maxLength={24} />
              <button className="btn btn-red mt-4 w-full !min-h-12">{t.entry === 'Free' ? 'Register free' : `Register · ${t.entry}`}</button>
              <p className="mt-2 text-center text-xs text-muted">Demo: registration is stored only in this browser.</p>
            </form>
          )}
        </aside>
      </div>
    </div>
  )
}
