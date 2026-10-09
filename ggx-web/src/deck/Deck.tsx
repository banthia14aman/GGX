import type { CSSProperties, ReactNode } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { GiCrossedSwords, GiPodium, GiTwoCoins, GiPadlock, GiShakingHands } from 'react-icons/gi'
import { TbCalendar, TbQrcode, TbArrowBackUp, TbShieldCheck, TbCreditCard } from 'react-icons/tb'
import { photos, type PhotoKey } from '../data/images'
import { cs2Meta } from '../data/catalog'

const TOTAL = 14
const DEMO_URL = 'https://banthia14aman.github.io/GGX/'
const shot = (n: string) => `${import.meta.env.BASE_URL}deck-shots/${n}.jpg`

/* ---------- hand-made layer ---------- */

function Mark({ children, color = 'var(--color-red-hot)' }: { children: ReactNode; color?: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-[1]">{children}</span>
      <svg className="absolute -bottom-[0.12em] left-[-2%] h-[0.32em] w-[104%]" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden>
        <path d="M3 13 C 40 6, 88 17, 128 9 S 186 12, 197 6" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function Ring({ children, pad = '0.35em' }: { children: ReactNode; pad?: string }) {
  return (
    <span className="relative inline-block" style={{ padding: `0 ${pad}` }}>
      {children}
      <svg className="absolute inset-[-28%_-8%] h-[156%] w-[116%]" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden>
        <path d="M104 9 C 36 5, 5 28, 8 54 C 11 84, 70 96, 122 92 C 176 87, 199 62, 193 38 C 187 14, 142 3, 88 12" fill="none" stroke="var(--color-red-hot)" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function Arrow({ style, flip = false, w = 220 }: { style?: CSSProperties; flip?: boolean; w?: number }) {
  return (
    <svg className="absolute" width={w} height={w * 0.6} viewBox="0 0 200 120" style={{ ...style, transform: `${style?.transform ?? ''} ${flip ? 'scaleX(-1)' : ''}` }} aria-hidden>
      <path d="M10 104 C 52 30, 118 14, 182 40" fill="none" stroke="var(--color-fg)" strokeWidth="4" strokeLinecap="round" />
      <path d="M160 22 L184 41 L158 54" fill="none" stroke="var(--color-fg)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Note({ children, style, red = false, size = 34 }: { children: ReactNode; style?: CSSProperties; red?: boolean; size?: number }) {
  return <div className={`hand absolute ${red ? 'text-red-hot' : 'text-fg'}`} style={{ fontSize: size, ...style }}>{children}</div>
}

function Tape({ style }: { style?: CSSProperties }) {
  return <div className="tape" style={style} aria-hidden />
}

function Polaroid({ k, caption, style, img }: { k?: PhotoKey; caption: string; style: CSSProperties; img?: string }) {
  return (
    <figure className="polaroid m-0" style={style}>
      <div className="h-full w-full overflow-hidden"><img src={img ?? photos[k!].src} alt={caption} /></div>
      <figcaption className="hand">{caption}</figcaption>
    </figure>
  )
}

function Duo({ k, style, className = '' }: { k: PhotoKey; style?: CSSProperties; className?: string }) {
  return <div className={`duo absolute ${className}`} style={style}><img src={photos[k].src} alt="" className="h-full w-full object-cover" /></div>
}

function Browser({ src, url, style }: { src: string; url: string; style: CSSProperties }) {
  return (
    <div className="browser" style={style}>
      <div className="bar"><i /><i /><i /><span>{url}</span></div>
      <img src={src} alt={`GGX ${url}`} />
    </div>
  )
}

function Phone({ src, style }: { src: string; style: CSSProperties }) {
  return <div className="phone" style={style}><img src={src} alt="GGX on a phone" /></div>
}

/* ---------- slide chrome ---------- */

function Slide({ n, label, source, children, bare = false }: { n: number; label: string; source?: string; children: ReactNode; bare?: boolean }) {
  return (
    <section className="slide">
      {children}
      {source && <div className="absolute bottom-[86px] left-24 z-10 max-w-[1300px] text-[15px] text-muted">Source: {source}</div>}
      {!bare && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex h-[72px] items-center gap-6 border-t border-line bg-ink/90 px-24 text-[17px]">
          <span className="display text-[34px]">GG<span className="text-red">X</span></span>
          <span className="font-semibold uppercase tracking-[0.22em] text-muted">{label}</span>
          <span className="tabular ml-auto font-semibold text-muted"><span className="text-fg">{String(n).padStart(2, '0')}</span> / {TOTAL}</span>
        </div>
      )}
    </section>
  )
}

const Kicker = ({ children }: { children: ReactNode }) => (
  <div className="mb-5 flex items-center gap-3 text-[20px] font-semibold uppercase tracking-[0.22em] text-red-text"><span className="h-[2px] w-10 bg-red" />{children}</div>
)

/* ---------- slides ---------- */

function Cover() {
  return (
    <Slide n={1} label="Pitch" bare>
      <Duo k="heroStage" className="scanlines inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg)_18%,transparent_75%)]" />
      <div className="absolute left-28 top-24">
        <div className="inline-flex items-center gap-3 bg-red px-4 py-2 text-[20px] font-bold uppercase tracking-[0.2em] text-ink"><span className="h-3 w-3 rounded-full bg-ink" />Live on campus</div>
        <div className="display mt-6 text-[400px] leading-[0.8]">GG<span className="glow-text text-red">X</span></div>
        <div className="display mt-6 text-[96px]">Good Game Exchange</div>
        <p className="mt-6 max-w-[900px] text-[34px] text-fg/85">The verified campus gaming economy for IIT Delhi. Buy, rent and trade gear. Find a squad. Compete.</p>
        <p className="mt-10 text-[22px] uppercase tracking-[0.2em] text-muted">Mobile Commerce · DMS, IIT Delhi · October 2026</p>
      </div>
      <div className="stamp h-[230px] w-[230px] text-[40px]" style={{ right: 150, top: 120, transform: 'rotate(12deg)' }}>Made<br />for<br />IITD</div>
      <Note red size={46} style={{ left: 980, top: 300, transform: 'rotate(-6deg)' }}>game hard.<br />trade harder.</Note>
      <Arrow w={200} style={{ left: 840, top: 360, transform: 'rotate(160deg)' }} />
    </Slide>
  )
}

function Problem() {
  const msgs: [string, string, boolean?][] = [
    ['riya_k', 'anyone selling a ps5 controller?? need by tonight'],
    ['devcasts', 'valo ranked rn, need 1. gold+ only'],
    ['+91 98xxx xx213', 'skins cheap cheap. dm me. 100% legit trust me bro', true],
    ['n00bslayer', 'is the ps5 rental still on? how much deposit'],
    ['kabir.gg', 'esports fury form in bio. pay on upi and send ss here'],
  ]
  return (
    <Slide n={2} label="The problem" source="CyberMedia Research (CMR), Gen Z gaming survey, May 2025: 74% of Gen Z gamers play 6+ hours a week.">
      <div className="absolute left-24 top-24 w-[820px]">
        <Kicker>Tonight, 11 PM, Aravali</Kicker>
        <h1 className="display text-[124px]">Campus gaming runs on <Mark>six apps</Mark> and blind trust.</h1>
        <ul className="mt-12 space-y-5 text-[30px]">
          {[['Find a teammate', 'Discord, random lobbies'], ['Sell a controller', 'OLX, to strangers'], ['Rent a console', 'WhatsApp and a promise'], ['Enter a tournament', 'Google Form + UPI screenshot']].map(([a, b]) => (
            <li key={a} className="flex items-baseline gap-4 border-b border-line pb-4"><span className="w-[340px] font-semibold">{a}</span><span className="text-muted">{b}</span></li>
          ))}
        </ul>
      </div>
      <div className="absolute right-24 top-24 w-[720px] rotate-[1.5deg] border border-line bg-surface p-8 shadow-[0_40px_80px_-30px_black]">
        <div className="mb-6 flex items-center justify-between border-b border-line pb-4 text-[22px]"><b>IITD Gamers</b><span className="text-muted">247 members</span></div>
        <div className="space-y-5">
          {msgs.map(([who, text, sus]) => (
            <div key={who} className={`relative w-fit max-w-[600px] rounded-2xl bg-raised px-6 py-4 text-[26px] ${sus ? 'ml-6' : ''}`}>
              <div className={`text-[18px] font-semibold ${sus ? 'text-warn' : 'text-red-text'}`}>{who}</div>{text}
              {sus && <svg className="absolute inset-[-14%_-5%] h-[128%] w-[110%]" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden><path d="M104 9 C 36 5, 5 28, 8 54 C 11 84, 70 96, 122 92 C 176 87, 199 62, 193 38 C 187 14, 142 3, 88 12" fill="none" stroke="var(--color-red-hot)" strokeWidth="3" strokeLinecap="round" /></svg>}
            </div>
          ))}
        </div>
      </div>
      <Note red size={44} style={{ right: 70, top: 470, transform: 'rotate(8deg)' }}>legit?</Note>
      <Tape style={{ right: 640, top: 70, transform: 'rotate(-8deg)' }} />
    </Slide>
  )
}

function Who() {
  return (
    <Slide n={3} label="Who we serve" source="IAMAI (95% of Indian gamers play on mobile); HP India Gaming Landscape study, 3,500 respondents (67% of serious Gen Z gamers prefer PC).">
      <div className="absolute left-24 top-20"><Kicker>Segmentation</Kicker><h1 className="display text-[110px]">Two kinds of gamer. One campus.</h1></div>
      <div className="absolute left-24 top-[330px] w-[760px]">
        <div className="display text-[210px] leading-none text-red glow-text">95%</div>
        <p className="mt-2 text-[34px]">of Indian gamers play on <b>mobile</b>. BGMI, Free Fire, CODM.</p>
        <p className="mt-6 text-[26px] text-muted">They need: squads at their rank, free tournaments, ₹150 to ₹2,400 accessories.</p>
      </div>
      <div className="absolute left-[1000px] top-[330px] w-[440px]">
        <div className="display text-[210px] leading-none">67%</div>
        <p className="mt-2 text-[34px]">of <b>serious</b> Gen Z gamers prefer PC, and spend ₹1L+ on a rig.</p>
        <p className="mt-6 text-[26px] text-muted">They need: console rentals, safe CS2 trades.</p>
      </div>
      <Polaroid k="mobileCtrl" caption="BGMI at 1 AM" style={{ left: 1500, top: 250, width: 330, height: 330, transform: 'rotate(5deg)' }} />
      <Tape style={{ left: 1600, top: 232, transform: 'rotate(-4deg)' }} />
      <Polaroid k="pcSetup" caption="the ₹1L rig, idle on weekdays" style={{ left: 1470, top: 610, width: 380, height: 300, transform: 'rotate(-4deg)' }} />
      <Note size={30} style={{ left: 880, top: 820, transform: 'rotate(-3deg)', width: 520 }}>different surveys, different gamers. both are true.</Note>
    </Slide>
  )
}

function Market() {
  const rows = [['Active users', '720', '1,800', '3,510'], ['GMV', '₹4.3L', '₹21.6L', '₹70.2L'], ['Revenue incl. sponsors', '₹0.35L', '₹3.2L', '₹11.4L']]
  return (
    <Slide n={4} label="Market" source="Lumikai, State of India Interactive Media (India games market $3.8B in 2024, $9.2B by 2029; 591M gamers). Year-1 model: GGX analysis, 12,000 IITD students.">
      <div className="absolute left-24 top-20"><Kicker>Market</Kicker><h1 className="display text-[120px]">Big category. <Mark>Honest slice.</Mark></h1></div>
      <svg className="absolute left-24 top-[360px]" width="760" height="520" aria-label="India games market, 2024 versus 2029">
        <defs><pattern id="hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="14" fill="oklch(0.62 0.235 25)" /><rect width="6" height="14" fill="oklch(0.5 0.2 25)" /></pattern></defs>
        <line x1="0" y1="440" x2="740" y2="440" stroke="var(--color-line-strong)" strokeWidth="2" />
        <rect x="70" y={440 - 3.8 * 40} width="220" height={3.8 * 40} fill="var(--color-raised)" stroke="var(--color-line-strong)" />
        <rect x="420" y={440 - 9.2 * 40} width="220" height={9.2 * 40} fill="url(#hatch)" />
        <text x="180" y={440 - 3.8 * 40 - 20} textAnchor="middle" fill="var(--color-fg)" fontSize="52" fontWeight="700">$3.8B</text>
        <text x="530" y={440 - 9.2 * 40 - 20} textAnchor="middle" fill="var(--color-fg)" fontSize="52" fontWeight="700">$9.2B</text>
        <text x="180" y="490" textAnchor="middle" fill="var(--color-muted)" fontSize="28">2024</text>
        <text x="530" y="490" textAnchor="middle" fill="var(--color-muted)" fontSize="28">2029</text>
      </svg>
      <Note size={36} style={{ left: 240, top: 420, transform: 'rotate(-8deg)' }}>2.4x in 5 years</Note>
      <div className="absolute left-[960px] top-[370px] w-[860px]">
        <div className="mb-4 text-[24px] font-semibold uppercase tracking-[0.18em] text-muted">GGX Year 1, IIT Delhi only</div>
        <table className="w-full text-[30px]">
          <thead><tr className="text-left text-muted">{['', 'Low', 'Base', 'High'].map((h) => <th key={h} className={`pb-4 font-semibold ${h === 'Base' ? 'text-red-text' : ''}`}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r[0]} className="border-t border-line">{r.map((c, i) => <td key={i} className={`tabular py-5 ${i === 0 ? 'text-muted' : i === 2 ? 'bg-red/10 px-3 font-bold' : 'px-3'}`}>{c}</td>)}</tr>
          ))}</tbody>
        </table>
      </div>
      <div className="sticky hand text-[30px]" style={{ left: 1360, top: 780, width: 440, transform: 'rotate(3deg)' }}>We cut the original ₹82.5L GMV claim. Defensible beats optimistic.</div>
    </Slide>
  )
}

function Solution() {
  const mods: [string, string][] = [['Market', 'Buy, sell and rent gear from verified students'], ['CS2 trades', 'Via Steam, seller paid only on day 8'], ['Squad', 'Find teammates by game, rank and time'], ['Arena', 'Free tournaments with QR entry passes'], ['Credits', 'Earned by helping, never bought']]
  return (
    <Slide n={5} label="The product">
      <div className="absolute left-24 top-20 w-[640px]">
        <Kicker>The product</Kicker>
        <h1 className="display text-[88px]">One app. Five reasons to open it <span className="text-red">tonight.</span></h1>
        <ol className="mt-9 space-y-4">
          {mods.map(([t, d], i) => (
            <li key={t} className="flex gap-6"><span className="display tabular text-[56px] leading-none text-red/80">{String(i + 1).padStart(2, '0')}</span><div><div className="text-[32px] font-semibold">{t}</div><div className="text-[24px] text-muted">{d}</div></div></li>
          ))}
        </ol>
      </div>
      <Browser src={shot('home')} url="ggx · home" style={{ left: 820, top: 150, width: 1010 }} />
      <Note red size={38} style={{ left: 1260, top: 820, transform: 'rotate(-4deg)' }}>real build. click it yourself.</Note>
      <Arrow w={170} style={{ left: 1100, top: 790, transform: 'rotate(-150deg)' }} />
    </Slide>
  )
}

function Wallet() {
  const skins: [string, string][] = [['AK-47 | Elite Build', '₹220'], ['AWP | Duality', '₹330'], ['AK-47 | Slate', '₹450'], ['M4A1-S | Nightmare', '₹970'], ['AWP | Fever Dream', '₹1,240'], ['AK-47 | Redline', '₹4,430']]
  const knife = cs2Meta('★ Navaja Knife | Safari Mesh')
  return (
    <Slide n={6} label="Pricing" source="Skinport median sale prices, October 2026, converted at ₹88.5 per US dollar. Item images: Valve, via the open CSGO-API dataset.">
      <div className="absolute left-24 top-20"><Kicker>Built for students</Kicker><h1 className="display text-[112px]">Priced for a <Mark>student wallet.</Mark></h1></div>
      <div className="absolute left-24 top-[380px] grid w-[1160px] grid-cols-3 gap-5">
        {skins.map(([n, p]) => {
          const m = cs2Meta(n)
          return (
            <div key={n} className="relative h-[200px] border border-line bg-ink p-4" style={{ background: `radial-gradient(ellipse at 50% 60%, ${m.color}33, transparent 70%), var(--color-ink)` }}>
              <img src={m.image} alt={n} className="mx-auto h-[110px] object-contain" />
              <div className="mt-2 flex items-baseline justify-between text-[22px]"><span className="text-fg/85">{n}</span><b className="tabular text-[28px]">{p}</b></div>
              <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: m.color }} />
            </div>
          )
        })}
      </div>
      <div className="absolute left-24 top-[870px] flex items-center gap-6 text-[34px]">
        <img src={knife.image} alt="Navaja Knife, Safari Mesh" className="h-[90px] -rotate-12" />
        <span>Your first knife: <Ring><b className="tabular">₹4,620</b></Ring></span>
      </div>
      <Phone src={shot('m-market')} style={{ left: 1420, top: 250, width: 360 }} />
      <Note size={30} style={{ left: 1300, top: 960, transform: 'rotate(-3deg)' }}>(and a ₹1.16L Karambit, for the dreamers)</Note>
    </Slide>
  )
}

function Rent() {
  const steps: [typeof TbCalendar, string, string][] = [[TbCalendar, 'Pick dates', '₹350 a day'], [TbCreditCard, 'Pay GGX', 'money is held'], [TbQrcode, 'Scan at pickup', 'QR + photos'], [TbArrowBackUp, 'Return it', 'scan again'], [TbShieldCheck, 'Deposit back', '+ credits earned']]
  return (
    <Slide n={7} label="How renting works">
      <div className="absolute left-24 top-20 w-[1150px]"><Kicker>Core flow</Kicker><h1 className="display text-[116px]">Rent a PS5 like you borrow a <span className="text-red">charger.</span></h1></div>
      <div className="absolute left-24 top-[420px] flex w-[1180px] justify-between">
        <div className="absolute left-[60px] right-[60px] top-[58px] border-t-[3px] border-dashed border-line-strong" />
        {steps.map(([I, t, d], i) => (
          <div key={t} className="relative w-[200px] text-center">
            <div className={`mx-auto grid h-[116px] w-[116px] place-items-center border-2 ${i === 2 ? 'border-red bg-red text-ink shadow-[0_0_40px_-6px_var(--color-red)]' : 'border-line-strong bg-surface text-red-text'}`}><I size={52} /></div>
            <div className="mt-5 text-[28px] font-semibold">{t}</div><div className="text-[22px] text-muted">{d}</div>
          </div>
        ))}
      </div>
      <div className="absolute left-24 top-[720px] w-[1150px] text-[30px] leading-relaxed">
        <p><b className="tabular">₹350 × 3 days = ₹1,050.</b> Plus a <span className="hl">₹10,000 refundable deposit</span> for a new player. Trusted players (3+ clean trades, 90%+ recommended) pay half on most gear.</p>
      </div>
      <Note red size={40} style={{ left: 520, top: 330, transform: 'rotate(-4deg)' }}>money moves only after this scan</Note>
      <Arrow w={130} style={{ left: 640, top: 360, transform: 'rotate(70deg)' }} />
      <Phone src={shot('m-order')} style={{ left: 1430, top: 110, width: 390 }} />
    </Slide>
  )
}

function SevenDay() {
  return (
    <Slide n={8} label="CS2 trade safety" source="Valve Steam update, July 2025: CS2 items received in trades are Trade Protected for 7 days and can be reversed by the sender (reported by csdb.gg and tradeit.gg).">
      <div className="absolute left-24 top-20 w-[1700px]"><Kicker>The insight</Kicker><h1 className="display text-[150px]">The 7-day rule.</h1>
        <p className="mt-4 max-w-[1300px] text-[36px] text-fg/85">Since July 2025, Steam lets the <b>sender reverse a CS2 trade for 7 days</b>. A marketplace that pays sellers instantly is paying scammers.</p></div>
      <div className="absolute left-24 top-[560px] w-[1720px]">
        <div className="relative flex h-[120px]">
          <div className="grid w-[12%] place-items-center bg-surface text-[24px] font-semibold">Day 0</div>
          <div className="relative flex-1 border-y-2 border-red/60" style={{ background: 'repeating-linear-gradient(135deg, oklch(0.62 0.235 25 / 0.28) 0 14px, transparent 14px 28px)' }}>
            <div className="absolute inset-0 grid place-items-center text-[30px] font-semibold">Days 1 to 7: trade protection, reversible</div>
          </div>
          <div className="grid w-[16%] place-items-center bg-red text-[30px] font-bold text-ink shadow-[0_0_50px_-8px_var(--color-red)]">Day 8</div>
        </div>
        <div className="mt-6 flex text-[24px] text-muted">
          <div className="w-[34%]">Buyer pays GGX. Seller sends the skin. Payment held.</div>
          <div className="w-[46%] text-center">Skin is usable, but the trade can still be undone.</div>
          <div className="w-[20%] text-right font-semibold text-fg">GGX pays the seller. Nothing left to reverse.</div>
        </div>
      </div>
      <Note red size={42} style={{ right: 140, top: 420, transform: 'rotate(5deg)' }}>pay on day 1 = fund scammers</Note>
      <Arrow w={150} style={{ right: 200, top: 460, transform: 'rotate(95deg)' }} />
    </Slide>
  )
}

function Competition() {
  const dots: { n: string; x: number; y: number; d: string; me?: boolean }[] = [
    { n: 'OLX', x: 12, y: 14, d: 'Anything, anyone, no trust layer' },
    { n: 'Cashify Play', x: 66, y: 22, d: 'PS5 rental from ₹499/day, delivery, no community' },
    { n: 'Skinport · Steam Market', x: 82, y: 8, d: 'Skins only, strangers worldwide' },
    { n: 'Discord · WhatsApp', x: 50, y: 46, d: 'Where it happens today, zero protection' },
    { n: 'Campurchase', x: 16, y: 80, d: 'Campus resale (lists IITD), not gaming' },
    { n: 'GGX', x: 80, y: 84, d: '', me: true },
  ]
  return (
    <Slide n={9} label="Competition" source="Company websites (Cashify Play, Campurchase, Skinport), October 2026. Positions are GGX's assessment.">
      <div className="absolute left-24 top-20"><Kicker>Positioning</Kicker><h1 className="display text-[110px]">Nobody owns the top-right.</h1></div>
      <div className="absolute left-[150px] top-[310px] h-[620px] w-[900px] border border-line bg-surface/50">
        <div className="absolute left-1/2 top-0 h-full w-px bg-line-strong" /><div className="absolute left-0 top-1/2 h-px w-full bg-line-strong" />
        {dots.map((p) => (
          <div key={p.n} className="absolute -translate-x-1/2 translate-y-1/2" style={{ left: `${p.x}%`, bottom: `${p.y}%` }}>
            {p.me ? (
              <div className="display text-[96px] leading-none"><Ring>GG<span className="text-red glow-text">X</span></Ring></div>
            ) : (
              <div className="flex items-center gap-3 whitespace-nowrap text-[24px] font-semibold"><span className="h-4 w-4 rounded-full bg-muted" />{p.n}</div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute left-[150px] top-[945px] w-[900px] text-center text-[22px] uppercase tracking-[0.18em] text-muted">General goods → Gaming-specific</div>
      <div className="absolute left-[40px] top-[620px] w-[620px] origin-center -translate-x-1/2 -rotate-90 text-center text-[22px] uppercase tracking-[0.18em] text-muted" style={{ left: 100 }}>Open internet → Verified campus</div>
      <ul className="absolute left-[1160px] top-[330px] w-[660px] space-y-6 text-[26px]">
        {dots.filter((d) => !d.me).map((p) => <li key={p.n} className="border-b border-line pb-4"><b>{p.n}</b><div className="text-muted">{p.d}</div></li>)}
      </ul>
    </Slide>
  )
}

function Money() {
  return (
    <Slide n={10} label="Business model" source="KRAFTON India esports roadmap 2025 (Campus Tour: ₹2L+ per host college). Payment cost: Razorpay standard rate card (~2%).">
      <div className="absolute left-24 top-20 w-[1150px]"><Kicker>Business model</Kicker><h1 className="display text-[110px]">How GGX makes money.</h1></div>
      <div className="absolute left-24 top-[300px] w-[1000px] space-y-6">
        {[['8%', 'on every completed sale'], ['12%', 'on every completed rental'], ['₹2L+', 'what one brand already pays a single host college for a campus tour (KRAFTON). GGX sells that audience every week, not once a year.'], ['Later', 'promoted listings, organizer tools']].map(([a, b]) => (
          <div key={a} className="flex items-baseline gap-8 border-b border-line pb-6"><span className="display tabular w-[220px] shrink-0 text-[80px] leading-none text-red">{a}</span><span className="text-[30px]">{b}</span></div>
        ))}
      </div>
      <div className="receipt w-[520px] text-[24px]" style={{ left: 1260, top: 230, transform: 'rotate(2.5deg)' }}>
        <div className="text-center text-[28px] font-bold">GGX · ORDER GGX-4821</div>
        <div className="mb-6 text-center text-[20px] opacity-70">PS5 Slim rental · 3 days</div>
        {[['Rent', '₹1,050'], ['GGX commission 12%', '₹126'], ['Payment cost ~2%', '−₹21'], ['Credits spent', '₹0*']].map(([a, b]) => (
          <div key={a} className="flex justify-between border-b border-dashed border-black/25 py-3"><span>{a}</span><span>{b}</span></div>
        ))}
        <div className="mt-4 flex justify-between text-[30px] font-bold"><span>GGX keeps</span><span>₹105</span></div>
        <div className="mt-4 text-[18px] opacity-70">* spent on Passport cosmetics, not discounts</div>
      </div>
      <Tape style={{ left: 1440, top: 205, transform: 'rotate(-3deg)' }} />
      <Note red size={34} style={{ left: 1200, top: 820, transform: 'rotate(-4deg)', width: 640 }}>cosmetics instead of discounts took us from ₹55 to ₹105 per rental</Note>
    </Slide>
  )
}

function SteamLessons() {
  const rows: [string, string][] = [['Points Shop', 'Credits buy cosmetics, so rewards cost us nothing'], ['Wishlists', 'Demand data without running a survey'], ['Recommended / Not', '"92% recommended" instead of inflated stars'], ['Refund promise', 'GGX Guarantee: not as described, refund in 48h'], ['Seasonal sales', 'GGX Fest Week: buyers and sellers in the same week']]
  return (
    <Slide n={11} label="Playbook" source="Public Steam features (Points Shop, Wishlist, user reviews, refund policy, seasonal sales). No insider data.">
      <div className="absolute left-24 top-20"><Kicker>Lessons from Steam</Kicker><h1 className="display text-[116px]">Five things we borrowed from <span className="text-red">Steam.</span></h1></div>
      <div className="absolute left-24 top-[380px] w-[1400px]">
        {rows.map(([a, b], i) => (
          <div key={a} className="grid grid-cols-[100px_420px_80px_1fr] items-baseline border-b border-line py-6 text-[32px]">
            <span className="display tabular text-[54px] leading-none text-red/80">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-muted">{a}</span><span className="text-red-text">→</span><span className="font-semibold">{b}</span>
          </div>
        ))}
      </div>
      <div className="stamp h-[210px] w-[210px] text-[34px]" style={{ right: 140, top: 430, transform: 'rotate(-10deg)' }}>Public<br />playbook<br />campus<br />twist</div>
    </Slide>
  )
}

function Trust() {
  const items: [typeof GiPadlock, string, string][] = [
    [GiPodium, 'Online Gaming Act 2025', 'Tournaments free by default, prizes sponsor-funded, no stakes or wagers'],
    [GiCrossedSwords, 'No account trading', 'Riot and PlayStation terms ban it. GGX blocks it at listing time'],
    [GiTwoCoins, 'Credits are not money', 'Earned only. Never bought, transferred or cashed out'],
    [GiPadlock, 'DPDP Act 2023', 'Hostel name only, no room numbers, delete-my-account'],
    [GiShakingHands, 'Verified IITD only', 'Every account signs in with an @iitd.ac.in email'],
  ]
  return (
    <Slide n={12} label="Trust and compliance" source="Promotion and Regulation of Online Gaming Act, 2025; Digital Personal Data Protection Act, 2023; Riot Games and PlayStation India terms of service.">
      <div className="absolute left-24 top-20"><Kicker>Trust</Kicker><h1 className="display text-[124px]">Clean by <Mark>design.</Mark></h1></div>
      <ul className="absolute left-24 top-[340px] w-[1150px] space-y-7">
        {items.map(([I, t, d]) => (
          <li key={t} className="flex items-start gap-7">
            <svg width="54" height="54" viewBox="0 0 50 50" className="mt-1 shrink-0" aria-hidden><path d="M8 27 L20 39 L43 9" fill="none" stroke="var(--color-ok)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div><div className="flex items-center gap-3 text-[34px] font-semibold"><I className="text-red-text" />{t}</div><div className="text-[26px] text-muted">{d}</div></div>
          </li>
        ))}
      </ul>
      <Phone src={shot('m-pass')} style={{ left: 1420, top: 110, width: 390 }} />
      <Note size={32} style={{ left: 1180, top: 900, transform: 'rotate(-4deg)' }}>one pass, one entry</Note>
    </Slide>
  )
}

function Launch() {
  const phases: [string, string, string][] = [['0', 'Set up', 'Verified sign-in, seed listings via gaming societies'], ['1', 'GGX Fest Week', 'Launch at Esports Fury: market, squads, free tournament'], ['2', 'Payments + trust', 'UPI, held payments, QR handover, deposits'], ['3', 'Arena', 'First tournament run end to end on GGX'], ['4', 'Delhi-NCR', 'DTU, NSUT and more: inter-college finals at IITD']]
  return (
    <Slide n={13} label="Go to market" source="Pilot gates from the GGX requirements analysis. Esports Fury is run by the DMS Sports Committee, IIT Delhi.">
      <div className="absolute left-24 top-20"><Kicker>Go to market</Kicker><h1 className="display text-[124px]">Launch at <span className="text-red">Esports Fury.</span></h1></div>
      <div className="absolute left-24 top-[380px] w-[1180px]">
        {phases.map(([n, t, d], i) => (
          <div key={n} className="relative flex gap-8 pb-8">
            {i < phases.length - 1 && <span className="absolute left-[27px] top-[62px] h-[calc(100%-56px)] w-[3px] bg-line-strong" />}
            <span className={`grid h-[58px] w-[58px] shrink-0 place-items-center border-2 text-[28px] font-bold ${i === 1 ? 'border-red bg-red text-ink shadow-[0_0_30px_-4px_var(--color-red)]' : 'border-line-strong'}`}>{n}</span>
            <div><div className="text-[32px] font-semibold">{t}</div><div className="text-[24px] text-muted">{d}</div></div>
          </div>
        ))}
      </div>
      <div className="sticky" style={{ left: 1340, top: 330, width: 470, transform: 'rotate(-2.5deg)' }}>
        <div className="hand text-[34px]">Pilot passes if:</div>
        <ul className="hand mt-3 space-y-1 text-[30px] font-normal">
          <li>500 verified gamers</li><li>50+ listings</li><li>30+ completed deals</li><li>under 5% disputes</li>
        </ul>
      </div>
      <div className="absolute left-[1340px] top-[760px] w-[470px] border border-line bg-surface p-6">
        <div className="text-[20px] uppercase tracking-[0.18em] text-muted">North-star metric</div>
        <div className="mt-2 text-[34px] font-semibold">Weekly completed exchanges</div>
        <div className="text-[22px] text-muted">sales + rentals returned + tournament check-ins</div>
      </div>
    </Slide>
  )
}

function Close() {
  return (
    <Slide n={14} label="Thank you" bare>
      <Duo k="crowd" className="inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-bg)_8%,transparent_70%)]" />
      <div className="absolute bottom-28 left-28">
        <div className="display text-[330px] leading-[0.8]">GG<span className="text-red glow-text">?</span></div>
        <p className="mt-8 max-w-[1100px] text-[44px] font-semibold">Let us run the GGX pilot at Esports Fury.</p>
        <p className="mt-3 text-[28px] text-muted">500 verified gamers. One festival week. Real deals, real data.</p>
      </div>
      <div className="absolute bottom-28 right-28 text-center">
        <div className="bg-[oklch(0.96_0.005_80)] p-5"><QRCodeSVG value={DEMO_URL} size={250} bgColor="#f4f1ec" fgColor="#120b0b" /></div>
        <div className="mt-4 text-[24px] font-semibold">Try the live demo</div>
        <div className="text-[20px] text-muted">banthia14aman.github.io/GGX</div>
      </div>
      <Note red size={60} style={{ right: 470, bottom: 330, transform: 'rotate(-8deg)' }}>thank you!</Note>
      <Arrow w={180} style={{ right: 420, bottom: 230, transform: 'rotate(20deg)' }} />
      <Tape style={{ right: 330, bottom: 455, transform: 'rotate(-14deg)' }} />
    </Slide>
  )
}

export default function Deck() {
  return (
    <main>
      <Cover /><Problem /><Who /><Market /><Solution /><Wallet /><Rent /><SevenDay /><Competition /><Money /><SteamLessons /><Trust /><Launch /><Close />
    </main>
  )
}

