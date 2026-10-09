import { useState } from 'react'
import { TbBrandDiscord, TbClock } from 'react-icons/tb'
import { GiTargeted } from 'react-icons/gi'
import { SectionHead } from '../components'
import { findSeller, lfg } from '../data/catalog'
import { useStore } from '../store'

const GAMES = ['All', 'BGMI', 'Valorant', 'CS2', 'EA FC']

export default function Squad() {
  const { invited, invite, notify } = useStore()
  const [game, setGame] = useState('All')
  const [form, setForm] = useState({ game: 'Valorant', rank: '', role: '', window: 'Tonight 11 PM - 1 AM' })
  const list = lfg.filter((p) => game === 'All' || p.game === game)

  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-10 md:px-6">
      <SectionHead kicker="Squad" title={<>Looking for <span className="text-red">group</span></>} />
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-5 flex flex-wrap gap-2" role="radiogroup" aria-label="Game">
            {GAMES.map((g) => (
              <button key={g} role="radio" aria-checked={game === g} onClick={() => setGame(g)}
                className={`min-h-10 border px-4 text-sm font-semibold transition-colors ${game === g ? 'border-red bg-red text-ink' : 'border-line-strong text-muted hover:text-fg'}`}>{g}</button>
            ))}
          </div>
          <div className="border border-line">
            {list.map((p) => {
              const s = findSeller(p.seller)
              const on = invited.includes(p.id)
              return (
                <div key={p.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line p-4 last:border-b-0 hover:bg-surface">
                  <div className="grid h-12 w-12 place-items-center border border-line-strong font-bold">{s.name.slice(0, 2).toUpperCase()}</div>
                  <div className="min-w-0">
                    <div className="font-semibold">{s.handle} <span className="text-xs font-normal text-muted">· {s.hostel} · {s.trades ? `${s.rec}% rec` : 'new'}</span></div>
                    <div className="mt-0.5 flex flex-wrap gap-x-3 text-sm text-muted">
                      <span className="font-medium text-red-text">{p.game}</span><span>{p.rank}</span><span>{p.role}</span><span>{p.mode}</span>
                    </div>
                    <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-fg/70"><TbClock aria-hidden />{p.window}</div>
                  </div>
                  <button onClick={() => invite(p.id)} disabled={on} className={`btn btn-line ${on ? 'opacity-60' : ''} !min-h-10`}>{on ? 'Invited' : 'Invite'}</button>
                </div>
              )
            })}
          </div>
        </div>

        <form className="hud h-fit border border-line bg-surface p-5 lg:sticky lg:top-24" onSubmit={(e) => { e.preventDefault(); notify(`LFG posted: ${form.game}${form.rank ? ', ' + form.rank : ''}. Matches will ping you.`) }}>
          <GiTargeted className="text-4xl text-red-text" aria-hidden />
          <h2 className="display mt-2 text-4xl">Post LFG</h2>
          <label className="label mt-4" htmlFor="g">Game</label>
          <select id="g" className="field" value={form.game} onChange={(e) => setForm({ ...form, game: e.target.value })}>{GAMES.slice(1).map((g) => <option key={g}>{g}</option>)}</select>
          <label className="label mt-3" htmlFor="r">Rank</label>
          <input id="r" className="field" placeholder="e.g. Gold 2, Crown III" value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })} />
          <label className="label mt-3" htmlFor="ro">Role</label>
          <input id="ro" className="field" placeholder="e.g. Duelist, IGL, AWPer" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <label className="label mt-3" htmlFor="w">When</label>
          <input id="w" className="field" value={form.window} onChange={(e) => setForm({ ...form, window: e.target.value })} />
          <button className="btn btn-red mt-5 w-full">Post</button>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted"><TbBrandDiscord aria-hidden /> Squad chat links out to Discord or WhatsApp.</p>
        </form>
      </div>
    </div>
  )
}
