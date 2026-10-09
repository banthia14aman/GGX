# GGX: Good Game Exchange (web prototype)

Front-end prototype of the GGX campus gaming marketplace for the Mobile Commerce project (DMS, IIT Delhi). React 19 + TypeScript + Vite, Tailwind CSS v4, Motion, react-icons, qrcode.react.

Everything is clickable: browse, filter, open listings, rent with dates and deposits, check out, track orders, register for tournaments, invite teammates, list your own gear. **Payments, Steam trades and emails are simulated.** There is no backend; demo state is saved in the browser (reset it from the Me page).

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173. For a production build, run `npm run build`; the output lands in `dist/`.

## Two-minute demo script

1. **Home**: the live hero, the kill-feed ticker, the "first knife under ₹5,000" featured drop. Hover the "Pick your class" list.
2. **Market → CS2 skins → Under ₹500**: real skins at student prices (from ₹220), with real rarity colours. A few outliers (marked Grail) show the top end. Open the Karambit: the float bar, and how the Steam delivery works (payout on day 8, after Steam's 7-day trade protection).
3. **Market → PS5 Slim**: switch to Rent, pick 3 days. Show the deposit rule. **Rent now → Pay** (simulated Razorpay) → **Track**: QR handover, then simulate the return; the order completes and earns credits.
4. **Skin Lab**: paint wraps onto a real PS5 photo.
5. **Arena → Esports Fury**: register a squad and get a QR pass.
6. **Sell**: try listing "Valorant account" to see it blocked (no account trading).

## Data and credits

- Prices: hardware from Indian retail research (Oct 2026); CS2 skins are Skinport median sale prices (Oct 2026) converted at ₹88.5/$. All people, listings and figures are demo data.
- Photos: Wikimedia Commons under open licences. Each is credited in the site footer and in `src/data/images.ts`.
- CS2 item images: Valve artwork via the open ByMykel CSGO-API dataset, used for a non-commercial academic demo.
- Icons: game-icons.net (CC BY 3.0) and Tabler Icons (MIT).
