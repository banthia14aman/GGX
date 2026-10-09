import type { IconType } from 'react-icons'
import { GiSmartphone, GiComputerFan, GiFist, GiPaintBrush, GiGamepad } from 'react-icons/gi'
import { cs2Images, type PhotoKey } from './images'

// All data is demo data. Prices: hardware from Indian retail research (Oct 2026);
// CS2 skins from Skinport median sale prices (Oct 2026) in INR. Nothing here is live.

export type Kind = 'cs2' | 'console' | 'controller' | 'mobile' | 'wrap' | 'pc' | 'vr'
export type Mode = 'buy' | 'rent' | 'both'
export type Art = { type: 'photo'; key: PhotoKey; fit?: 'cover' | 'contain' } | { type: 'cs2' } | { type: 'icon'; icon: IconType }

export type Seller = { id: string; handle: string; name: string; hostel: string; year: string; rec: number; trades: number; tier: 1 | 2; since: string }

export type Item = {
  id: string
  name: string
  kind: Kind
  mode: Mode
  price?: number
  rentPerDay?: number
  value: number
  condition?: 'New' | 'Like new' | 'Good' | 'Fair'
  wear?: string
  float?: number
  stattrak?: boolean
  art: Art
  seller: string
  listed: string
  watchers: number
  blurb: string
  specs: [string, string][]
}

export const KINDS: { id: Kind | 'all'; label: string }[] = [
  { id: 'all', label: 'All gear' },
  { id: 'cs2', label: 'CS2 skins' },
  { id: 'console', label: 'Consoles' },
  { id: 'controller', label: 'Controllers' },
  { id: 'mobile', label: 'Mobile gaming' },
  { id: 'wrap', label: 'Skins & wraps' },
  { id: 'pc', label: 'PC gear' },
  { id: 'vr', label: 'VR & sim' },
]

export const HOSTELS = ['Aravali', 'Girnar', 'Jwalamukhi', 'Karakoram', 'Kumaon', 'Nilgiri', 'Shivalik', 'Satpura', 'Udaigiri', 'Vindhyachal', 'Zanskar', 'Kailash', 'Himadri']

export const sellers: Seller[] = [
  { id: 's1', handle: 'arjun.exe', name: 'Arjun S.', hostel: 'Aravali', year: '3rd yr B.Tech', rec: 92, trades: 14, tier: 2, since: 'Aug 2026' },
  { id: 's2', handle: 'riya_k', name: 'Riya K.', hostel: 'Kailash', year: '1st yr B.Tech', rec: 100, trades: 6, tier: 2, since: 'Aug 2026' },
  { id: 's3', handle: 'kabir.gg', name: 'Kabir P.', hostel: 'Kumaon', year: 'MBA, DMS', rec: 97, trades: 31, tier: 2, since: 'Jul 2026' },
  { id: 's4', handle: 'devcasts', name: 'Dev M.', hostel: 'Nilgiri', year: '4th yr Dual', rec: 95, trades: 22, tier: 2, since: 'Jul 2026' },
  { id: 's5', handle: 'meera.flicks', name: 'Meera T.', hostel: 'Himadri', year: 'M.Tech', rec: 100, trades: 3, tier: 2, since: 'Sep 2026' },
  { id: 's6', handle: 'zanskar_zero', name: 'Ishaan R.', hostel: 'Zanskar', year: '2nd yr B.Tech', rec: 89, trades: 9, tier: 2, since: 'Aug 2026' },
  { id: 's7', handle: 'n00bslayer', name: 'Aditya V.', hostel: 'Shivalik', year: '1st yr B.Tech', rec: 0, trades: 0, tier: 1, since: 'Oct 2026' },
  { id: 's8', handle: 'awp.ananya', name: 'Ananya G.', hostel: 'Udaigiri', year: 'PhD, CSE', rec: 98, trades: 41, tier: 2, since: 'Jun 2026' },
]

const cs2 = (
  id: string, name: string, price: number, wear: string, float: number, seller: string, listed: string, watchers: number, stattrak = false,
): Item => ({
  id, name, kind: 'cs2', mode: 'buy', price, value: price, wear, float, stattrak, art: { type: 'cs2' }, seller, listed, watchers,
  blurb: 'Delivered through a Steam trade offer. GGX holds your payment and releases it to the seller only after Steam\'s 7-day trade protection ends, so the trade cannot be reversed on you.',
  specs: [['Game', 'Counter-Strike 2'], ['Exterior', wear], ['Float', float.toFixed(4)], ['StatTrak', stattrak ? 'Yes' : 'No'], ['Delivery', 'Steam trade offer'], ['Seller payout', 'Day 8, after trade protection']],
})

export const items: Item[] = [
  // CS2: priced for student wallets, plus a few aspirational outliers.
  // Prices: Skinport median sale price (Oct 2026), converted at ₹88.5/$ and rounded.
  cs2('ak-47-redline', 'AK-47 | Redline', 4430, 'Field-Tested', 0.2214, 's4', '30m ago', 44),
  cs2('navaja-knife-safari-mesh', '★ Navaja Knife | Safari Mesh', 4620, 'Field-Tested', 0.1859, 's6', '12m ago', 61),
  cs2('ak-47-asiimov', 'AK-47 | Asiimov', 4130, 'Field-Tested', 0.2884, 's1', '1h ago', 38),
  cs2('awp-hyper-beast', 'AWP | Hyper Beast', 3550, 'Field-Tested', 0.1698, 's7', '20m ago', 27),
  cs2('awp-chromatic-aberration', 'AWP | Chromatic Aberration', 3320, 'Field-Tested', 0.2649, 's2', '2h ago', 22),
  cs2('glock-18-water-elemental', 'Glock-18 | Water Elemental', 1800, 'Field-Tested', 0.23, 's5', '3h ago', 18),
  cs2('m4a4-desolate-space', 'M4A4 | Desolate Space', 1610, 'Field-Tested', 0.1669, 's6', '5h ago', 14),
  cs2('m4a1-s-decimator', 'M4A1-S | Decimator', 1250, 'Field-Tested', 0.259, 's4', '40m ago', 16),
  cs2('awp-fever-dream', 'AWP | Fever Dream', 1240, 'Field-Tested', 0.1627, 's2', '1h ago', 25),
  cs2('p250-asiimov', 'P250 | Asiimov', 1180, 'Field-Tested', 0.2439, 's7', '9m ago', 11),
  cs2('m4a1-s-nightmare', 'M4A1-S | Nightmare', 970, 'Field-Tested', 0.1693, 's1', '4h ago', 12),
  cs2('desert-eagle-mecha-industries', 'Desert Eagle | Mecha Industries', 590, 'Field-Tested', 0.1736, 's7', '15m ago', 9),
  cs2('ak-47-phantom-disruptor', 'AK-47 | Phantom Disruptor', 560, 'Field-Tested', 0.242, 's2', '2h ago', 10),
  cs2('awp-atheris', 'AWP | Atheris', 480, 'Field-Tested', 0.3245, 's5', '6h ago', 13),
  cs2('ak-47-slate', 'AK-47 | Slate', 450, 'Field-Tested', 0.1804, 's7', '35m ago', 17),
  cs2('ak-47-ice-coaled', 'AK-47 | Ice Coaled', 440, 'Field-Tested', 0.2008, 's6', '1d ago', 8),
  cs2('glock-18-vogue', 'Glock-18 | Vogue', 370, 'Field-Tested', 0.2836, 's2', '50m ago', 7),
  cs2('usp-s-cortex', 'USP-S | Cortex', 370, 'Field-Tested', 0.3493, 's5', '3h ago', 9),
  cs2('awp-duality', 'AWP | Duality', 330, 'Field-Tested', 0.2733, 's7', '5m ago', 12),
  cs2('ak-47-elite-build', 'AK-47 | Elite Build', 220, 'Field-Tested', 0.2363, 's7', '1m ago', 6),
  cs2('awp-asiimov', 'AWP | Asiimov', 12040, 'Field-Tested', 0.3551, 's8', '8h ago', 52),
  cs2('m4a1-s-printstream', 'M4A1-S | Printstream', 19730, 'Field-Tested', 0.1645, 's3', '1d ago', 39),
  cs2('karambit-doppler', '★ Karambit | Doppler', 116440, 'Factory New', 0.0606, 's8', '2d ago', 96),

  // Consoles and handhelds
  { id: 'ps5-slim', name: 'PS5 Slim (Disc) + 2 DualSense', kind: 'console', mode: 'both', price: 38500, rentPerDay: 350, value: 45000, condition: 'Like new', art: { type: 'photo', key: 'ps5Room' }, seller: 's1', listed: '1h ago', watchers: 63,
    blurb: 'Bought for placements season, barely touched since. Comes with two controllers, all cables and the box. Rent it for a weekend or take it home for good.',
    specs: [['Model', 'CFI-2000 Slim, disc'], ['Storage', '1 TB'], ['In the box', 'Console, 2 DualSense, HDMI, power'], ['New price', '₹54,990 MRP'], ['Handover', 'Aravali gate or LHC']] },
  { id: 'ps5-digital', name: 'PS5 Slim Digital', kind: 'console', mode: 'rent', rentPerDay: 300, value: 38000, condition: 'Good', art: { type: 'photo', key: 'ps5', fit: 'contain' }, seller: 's3', listed: '3h ago', watchers: 22,
    blurb: 'Rental only. Perfect for EA FC weekends. Two controllers available as an add-on.',
    specs: [['Model', 'PS5 Slim Digital'], ['Storage', '1 TB'], ['New price', '₹44,990 MRP'], ['Min rental', '1 day']] },
  { id: 'steam-deck', name: 'Steam Deck OLED 512 GB', kind: 'console', mode: 'both', price: 52000, rentPerDay: 450, value: 62000, condition: 'Like new', art: { type: 'photo', key: 'steamDeck', fit: 'contain' }, seller: 's4', listed: '2h ago', watchers: 48,
    blurb: 'Your whole Steam library in a backpack. Anti-glare screen, carry case included.',
    specs: [['Storage', '512 GB'], ['Display', '7.4" HDR OLED'], ['New price', '₹69,990'], ['Includes', 'Case, charger']] },
  { id: 'switch-2', name: 'Nintendo Switch 2 + Mario Kart World', kind: 'console', mode: 'rent', rentPerDay: 400, value: 48000, condition: 'New', art: { type: 'photo', key: 'switch2', fit: 'contain' }, seller: 's5', listed: '5h ago', watchers: 57,
    blurb: 'Imported unit. Rent it for a hostel Mario Kart night: four-player ready with the extra Joy-Con pair.',
    specs: [['Bundle', 'Mario Kart World'], ['Joy-Con', '2 pairs'], ['Region', 'Imported'], ['Min rental', '1 day']] },
  { id: 'xbox-sx', name: 'Xbox Series X 1 TB', kind: 'console', mode: 'buy', price: 34000, value: 34000, condition: 'Good', art: { type: 'photo', key: 'xbox' }, seller: 's6', listed: '1d ago', watchers: 18,
    blurb: 'Moving to PC. Works perfectly, small scuff on the top grille, controller included.',
    specs: [['Storage', '1 TB'], ['Controller', '1 included'], ['Condition note', 'Light scuff on top']] },

  // Controllers
  { id: 'dualsense-black', name: 'DualSense, Midnight Black', kind: 'controller', mode: 'both', price: 4200, rentPerDay: 60, value: 5990, condition: 'Like new', art: { type: 'photo', key: 'dualsense', fit: 'contain' }, seller: 's2', listed: '15m ago', watchers: 31,
    blurb: 'No stick drift, adaptive triggers tested. Spare after a gift.',
    specs: [['Platform', 'PS5, PC'], ['Battery', 'Full charge, ~7 h'], ['Stick drift', 'None']] },
  { id: 'xbox-pad', name: 'Xbox Wireless Controller', kind: 'controller', mode: 'buy', price: 3100, value: 3100, condition: 'Good', art: { type: 'photo', key: 'xbox' }, seller: 's6', listed: '1d ago', watchers: 9,
    blurb: 'Works on Xbox and PC over Bluetooth. Battery cover slightly loose.',
    specs: [['Platform', 'Xbox, PC'], ['Connection', 'Bluetooth, USB-C']] },

  // Mobile gaming: the mass market
  { id: 'mobile-ctrl', name: 'Telescopic mobile controller', kind: 'mobile', mode: 'both', price: 2400, rentPerDay: 40, value: 3500, condition: 'Like new', art: { type: 'photo', key: 'mobileCtrl' }, seller: 's7', listed: '25m ago', watchers: 29,
    blurb: 'Hall-effect sticks, USB-C passthrough charging. Turns any phone into a handheld for BGMI and cloud gaming.',
    specs: [['Fits', 'Phones up to 7"'], ['Sticks', 'Hall-effect'], ['Connection', 'USB-C, no lag']] },
  { id: 'f4-falcon', name: 'GameSir F4 Falcon grip', kind: 'mobile', mode: 'buy', price: 900, value: 1499, condition: 'Good', art: { type: 'icon', icon: GiGamepad }, seller: 's2', listed: '2h ago', watchers: 24,
    blurb: 'Four-finger claw setup for BGMI. The only grip under ₹2,000 that survives Delhi humidity.',
    specs: [['New price', '₹1,499'], ['Triggers', '4 mapped'], ['Games', 'BGMI, CODM, Free Fire']] },
  { id: 'phone-cooler', name: 'Magnetic phone cooler', kind: 'mobile', mode: 'both', price: 650, rentPerDay: 25, value: 999, condition: 'Like new', art: { type: 'icon', icon: GiComputerFan }, seller: 's4', listed: '45m ago', watchers: 19,
    blurb: 'Semiconductor cooler that keeps frame rates stable through a full classic match.',
    specs: [['Type', 'Peltier, magnetic'], ['Power', 'USB-C']] },
  { id: 'ak16-triggers', name: 'AK16 trigger set', kind: 'mobile', mode: 'buy', price: 199, value: 299, condition: 'New', art: { type: 'icon', icon: GiSmartphone }, seller: 's7', listed: '10m ago', watchers: 12,
    blurb: 'Clip-on shoulder triggers, sealed pack.', specs: [['New price', '₹299'], ['Fits', 'Most phones']] },
  { id: 'finger-sleeves', name: 'Anti-sweat finger sleeves (4 pack)', kind: 'mobile', mode: 'buy', price: 149, value: 149, condition: 'New', art: { type: 'icon', icon: GiFist }, seller: 's2', listed: '1h ago', watchers: 8,
    blurb: 'Silver-fibre sleeves for both thumbs and index fingers. Claw grip without the smudges.', specs: [['Pack', '4 sleeves'], ['Material', 'Silver fibre']] },

  // Skins & wraps (physical)
  { id: 'wrap-crimson', name: 'PS5 Slim wrap: Crimson Carbon', kind: 'wrap', mode: 'buy', price: 1899, value: 1899, condition: 'New', art: { type: 'icon', icon: GiPaintBrush }, seller: 's5', listed: '3h ago', watchers: 37,
    blurb: 'Precut 3M vinyl for the PS5 Slim shell and two DualSense controllers. Try it on the console in the Skin Lab first.',
    specs: [['Fits', 'PS5 Slim disc + 2 DualSense'], ['Material', '3M cast vinyl'], ['Finish', 'Textured carbon']] },
  { id: 'faceplates', name: 'PS5 faceplates, Volcanic Red', kind: 'wrap', mode: 'buy', price: 3200, value: 3999, condition: 'Like new', art: { type: 'photo', key: 'ps5', fit: 'contain' }, seller: 's1', listed: '6h ago', watchers: 26,
    blurb: 'Swap-on replacement shells. No scratches, original packaging.', specs: [['Fits', 'PS5 Slim disc'], ['New price', '~₹3,999']] },

  // PC gear
  { id: 'g910', name: 'Logitech G910 Orion Spectrum', kind: 'pc', mode: 'buy', price: 5800, value: 5800, condition: 'Good', art: { type: 'photo', key: 'keyboard' }, seller: 's8', listed: '4h ago', watchers: 13,
    blurb: 'Romer-G switches, per-key RGB, phone dock. All keys working.', specs: [['Switches', 'Romer-G Tactile'], ['Layout', 'Full size, US']] },
  { id: 'g903', name: 'Logitech G903 Lightspeed', kind: 'pc', mode: 'buy', price: 5400, value: 5400, condition: 'Like new', art: { type: 'photo', key: 'mouse', fit: 'contain' }, seller: 's4', listed: '2h ago', watchers: 16,
    blurb: 'Wireless, ambidextrous, receiver included. Fresh mouse feet.', specs: [['Sensor', 'HERO 25K'], ['Connection', 'Lightspeed wireless']] },
  { id: 'headset', name: 'Closed-back gaming headset', kind: 'pc', mode: 'both', price: 2800, rentPerDay: 50, value: 4500, condition: 'Good', art: { type: 'photo', key: 'headsets' }, seller: 's6', listed: '8h ago', watchers: 11,
    blurb: 'Clear footsteps for Valorant, detachable mic. Rent for a LAN or keep it.', specs: [['Mic', 'Detachable'], ['Connection', '3.5 mm + USB']] },
  { id: 'lan-rig', name: 'LAN rig: RTX PC + 240 Hz monitor', kind: 'pc', mode: 'rent', rentPerDay: 900, value: 120000, condition: 'Good', art: { type: 'photo', key: 'pcSetup' }, seller: 's3', listed: '1d ago', watchers: 34,
    blurb: 'Full tournament setup for Esports Fury qualifiers. Delivered to the venue by the owner, collected after.',
    specs: [['GPU', 'RTX-class'], ['Monitor', '24" 240 Hz'], ['Includes', 'Keyboard, mouse, headset'], ['Deposit', 'Capped at ₹10,000']] },

  // VR & sim
  { id: 'psvr2', name: 'PlayStation VR2 + Sense controllers', kind: 'vr', mode: 'rent', rentPerDay: 300, value: 45000, condition: 'Like new', art: { type: 'photo', key: 'psvr2' }, seller: 's5', listed: '2h ago', watchers: 27,
    blurb: 'Weekend VR for your PS5. Lenses cleaned and checked before every handover.', specs: [['Needs', 'PS5'], ['Includes', 'Headset, 2 Sense controllers']] },
  { id: 'quest3', name: 'Meta Quest 3 128 GB', kind: 'vr', mode: 'rent', rentPerDay: 350, value: 50000, condition: 'Good', art: { type: 'photo', key: 'quest3' }, seller: 's1', listed: '5h ago', watchers: 30,
    blurb: 'Standalone VR, no PC needed. Beat Saber and Superhot preinstalled.', specs: [['Storage', '128 GB'], ['Battery', '~2 h per charge']] },
  { id: 'g29', name: 'Logitech G29 wheel + pedals', kind: 'vr', mode: 'rent', rentPerDay: 250, value: 22000, condition: 'Good', art: { type: 'photo', key: 'g29' }, seller: 's6', listed: '1d ago', watchers: 21,
    blurb: 'Force-feedback wheel for Gran Turismo and Assetto Corsa. Desk clamps included.', specs: [['Platform', 'PS5, PC'], ['Includes', 'Wheel, 3 pedals, clamps']] },
]

export const findItem = (id: string) => items.find((i) => i.id === id)
export const findSeller = (id: string) => sellers.find((s) => s.id === id) ?? sellers[0]
export const cs2Meta = (name: string) => cs2Images[name] ?? { image: '', rarity: 'Mil-Spec', color: '#4b69ff' }

// Deposit rule (Requirements, Section 7): banded by item value, halved for tier-2 reputation, capped at ₹10,000.
export function deposit(value: number, tier: 1 | 2) {
  const rate = value < 2000 ? (tier === 2 ? 0 : 0.3) : value <= 15000 ? (tier === 2 ? 0.2 : 0.4) : tier === 2 ? 0.25 : 0.5
  return Math.min(10000, Math.round(value * rate))
}

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN')

export type Tournament = {
  id: string; name: string; game: string; format: string; when: string; venue: string; slots: number; filled: number
  entry: string; prize: string; sponsor: string; photo: PhotoKey; status: 'Open' | 'Filling fast' | 'Live' | 'Finished'
}

export const tournaments: Tournament[] = [
  { id: 'fury-bgmi', name: 'Esports Fury: BGMI Squads', game: 'BGMI', format: 'Squads of 4, 3 maps', when: 'Sat 18 Oct, 6:00 PM', venue: 'LHC 108, offline', slots: 32, filled: 26, entry: 'Free', prize: 'Sponsor gear pool', sponsor: 'Vertex Peripherals', photo: 'crowd', status: 'Filling fast' },
  { id: 'val-cup', name: 'Valorant Campus Cup', game: 'Valorant', format: '5v5, single elimination', when: 'Sun 19 Oct, 2:00 PM', venue: 'Online, finals at SAC', slots: 16, filled: 9, entry: 'Free', prize: 'Peripherals + Passport badge', sponsor: 'Vertex Peripherals', photo: 'heroStage', status: 'Open' },
  { id: 'cs2-wingman', name: 'CS2 Wingman Night', game: 'Counter-Strike 2', format: '2v2 Wingman, BO1', when: 'Fri 24 Oct, 10:00 PM', venue: 'Online', slots: 32, filled: 21, entry: 'Free', prize: 'Skin drops from sponsor', sponsor: 'Night Owl Energy', photo: 'crowd2', status: 'Open' },
  { id: 'fc-lan', name: 'EA FC Weekend LAN', game: 'EA FC', format: '1v1, Swiss + top 8', when: 'Sat 25 Oct, 11:00 AM', venue: 'Rendezvous hall, offline', slots: 48, filled: 40, entry: '₹99 venue pass', prize: 'Sponsor hamper', sponsor: 'Campus Café', photo: 'lan', status: 'Filling fast' },
]

export const lfg = [
  { id: 'l1', seller: 's2', game: 'Valorant', rank: 'Gold 3', role: 'Controller', window: 'Tonight 11 PM - 1 AM', mode: 'Competitive' },
  { id: 'l2', seller: 's4', game: 'Valorant', rank: 'Plat 1', role: 'Initiator', window: 'Tonight 10 PM - 12 AM', mode: 'Competitive' },
  { id: 'l3', seller: 's7', game: 'BGMI', rank: 'Crown III', role: 'Fragger', window: 'Now - 2 AM', mode: 'Competitive' },
  { id: 'l4', seller: 's6', game: 'CS2', rank: 'Premier 14,200', role: 'AWPer', window: 'Fri 9 PM', mode: 'Competitive' },
  { id: 'l5', seller: 's5', game: 'EA FC', rank: 'Div 4', role: 'Any', window: 'Sat afternoon', mode: 'Casual' },
  { id: 'l6', seller: 's3', game: 'BGMI', rank: 'Ace', role: 'IGL', window: 'Tonight 9 PM', mode: 'Competitive' },
  { id: 'l7', seller: 's8', game: 'CS2', rank: 'Premier 18,900', role: 'Entry', window: 'Tonight 12 AM', mode: 'Competitive' },
  { id: 'l8', seller: 's1', game: 'Valorant', rank: 'Diamond 1', role: 'Duelist', window: 'Sun 8 PM', mode: 'Casual' },
]

// Kill-feed style activity (demo)
export const feed: { a: string; verb: 'rented' | 'bought' | 'traded' | 'registered' | 'listed'; what: string; b?: string; ago: string }[] = [
  { a: 'riya_k', verb: 'rented', what: 'PS5 Slim', b: 'arjun.exe', ago: '2m' },
  { a: 'devcasts', verb: 'traded', what: 'AK-47 | Redline', b: 'n00bslayer', ago: '4m' },
  { a: 'Night Owls', verb: 'registered', what: 'Esports Fury: BGMI', ago: '6m' },
  { a: 'kabir.gg', verb: 'listed', what: '★ Karambit | Doppler', ago: '9m' },
  { a: 'meera.flicks', verb: 'rented', what: 'PS VR2', b: 'zanskar_zero', ago: '12m' },
  { a: 'awp.ananya', verb: 'traded', what: 'AWP | Asiimov', b: 'riya_k', ago: '15m' },
  { a: 'n00bslayer', verb: 'bought', what: 'GameSir F4 Falcon', b: 'riya_k', ago: '18m' },
  { a: 'Kumaon Kings', verb: 'registered', what: 'Valorant Campus Cup', ago: '21m' },
  { a: 'arjun.exe', verb: 'rented', what: 'Logitech G29 wheel', b: 'zanskar_zero', ago: '26m' },
  { a: 'zanskar_zero', verb: 'bought', what: 'DualSense, Midnight Black', b: 'riya_k', ago: '31m' },
]

export const kindIcon: Partial<Record<Kind, IconType>> = { mobile: GiSmartphone, wrap: GiPaintBrush }
