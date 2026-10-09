# GGX: Project Plan + Secondary Research (v1)

Date: 2026-10-08. Inputs: `IITD_Gaming_Exchange_Final_Report.docx` (concept), `Secondary Research Brief_ IIT Delhi Esports Ecosystem.pdf` (market data).

## 1. What the two documents give us

| Doc | Strength | Weakness |
|---|---|---|
| Concept report | Full product (Home/Market/Squad/Arena/Community), BMC, STP, KPIs, 5-phase roadmap | TAM and SOM rest on self-declared assumptions (40% gamers, ₹2,000/gamer, ₹2,500/user). It says to replace them with survey data |
| Research brief | Gen Z behaviour (6+ hrs/week, 10PM-2AM peak), mobile-first | Figures are unsourced in the PDF and some conflict with the report and with primary sources (see 2) |

## 2. Problems to fix before the professor sees it

1. **Market numbers conflict.** The brief says $9.1B by 2029, 19.6% CAGR and 517M players. The report says >$1.5B and ~555M gamers (Lumikai). Lumikai's own coverage says $3.8B (2024) → $9.2B (2029), about 20% CAGR, 591M gamers, and 8M paying gamers. Use one source throughout. I'd use Lumikai.
2. **The product is hardware-heavy, but the audience is mobile.** The brief says 90.4% of Gen Z gamers are mobile-first (PC 6.1%, console 3.5%). IAMAI-cited data says 95% play on mobile. Only a small share of students own or want to rent a PS5. A professor will ask who the renter is. The answer must come from primary research. The best-supported angle is mobile-gaming accessories, plus tournaments and community, with console/PC rental as one category.
3. **A competitor already offers cheaper console rental.** Cashify Play lists PS5 rental from ₹499/day with no deposit. The report's illustrative price is ₹350/day with a ₹5,000 deposit. Campurchase already claims IIT Delhi among 24+ campuses for general campus resale. The differentiation claim has to be "gaming-specific, verified, and community-linked", not "first campus marketplace".
4. **Tournament entry fees carry legal risk.** The Promotion and Regulation of Online Gaming Act 2025 bans money-linked online games, with fines up to ₹1 crore or up to 3 years' jail. Esports is protected only if it qualifies: fees may only cover entry or admin costs, prize money must be performance-based, there can be no stakes, and the game must be recognised and registered with the Authority. The report's "entry-fee take rate" revenue line needs a legal check. The safe pilot is free or sponsor-funded tournaments, with fees only for offline passes.
5. **Revenue is small.** Year-1 revenue is ₹6.6-8.3 lakh on ₹82.5L GMV. That is fine for a class project, but frame it as a validated pilot with an expansion path, not as a business case on its own.

## 3. Verified secondary data register

| # | Data point | Value | Source | Confidence |
|---|---|---|---|---|
| 1 | India gaming market | $3.8B (2024) → $9.2B (2029), ~20% CAGR | [Lumikai via GamesBeat](https://gamesbeat.com/indias-game-market-could-grow-from-3-8b-to-9-2b-by-2029-lumikai/) | High |
| 2 | Gamers / paying gamers | 591M gamers; 8M paying (FY24) | Lumikai (same search results) | Medium (single secondary summary) |
| 3 | Mobile share | 95% of gamers play on mobile | IAMAI figure via [Credyfi](https://www.credyfi.com/news/indian-youth-embrace-mobile-gaming-revolution) | Medium |
| 4 | Gen Z time | 74% spend 6+ hrs/week | Same page, and consistent with the brief's CMR 2025 data | Medium |
| 5 | Paying behaviour | 40%+ of hardcore gamers pay, average ₹230/month; 60% of payers bought a battle pass | IAMAI via [Credyfi](https://www.credyfi.com/news/indian-youth-embrace-mobile-gaming-revolution) / Outlook Respawn | Medium |
| 6 | Esports reach | 60% of Indian gamers engage with esports | Credyfi | Low-Medium |
| 7 | Gaming peripherals market | $531M (2025), ~6% CAGR | [IMARC](https://www.imarcgroup.com/india-gaming-peripherals-market) | Low-Medium (vendor report) |
| 8 | Gaming hardware market | $1.73B (2025) → $2.98B (2034) | [Deep Market Insights](https://deepmarketinsights.com/vista/insights/gaming-hardware-market/india) | Low-Medium |
| 9 | Refurbished consoles | 40-55% discounts; PS5 ~₹20-25K refurbished vs ~₹60K new | [Cashify](https://www.cashify.in/how-to-play-playstation-games-without-spending-60000-on-a-console) | Medium |
| 10 | Console rental price | PS5 from ₹499/day, no deposit (Cashify Play) | Cashify | Medium |
| 11 | Regulation | Online Gaming Act 2025 notified 22 Aug 2025; esports legitimised if registered; fees only for entry/admin | [SCC Online](https://www.scconline.com/blog/post/2025/08/24/promotion-regulation-online-gaming), [law text](https://lawascode.negd.in/laws/the-promotion-and-regulation-of-online-gaming-act-2025) | High |
| 12 | Campus competitors | Campurchase (24+ campuses incl. IIT Delhi), CampusKart, RentIts, iWantIt, UME | [Product Hunt / sites](https://www.producthunt.com/p/rentits) | Low-Medium (self-reported) |
| 13 | IITD context | Esports Fury (DMS), G.A.M.E.S. lab, ~12,000 students | Brief and report citing IITD pages | Medium |

**Gaps I could not fill** (listed so we don't invent numbers): student-specific gaming spend, how many students own consoles/PCs, secondary-market demand for gaming gear on campus, rental damage and loss rates, and Shoutt's and UME's traction. Primary research has to cover these.

## 4. Plan: step by step

Each phase ends with a deliverable you can show the professor. We don't start the next phase until you approve the current one.

| Phase | Output | What I do | What you do |
|---|---|---|---|
| **A. Secondary research** (now) | This file → polished evidence deck/doc | Verify the remaining claims (competitors, IITD facts, G.A.M.E.S. lab, Esports Fury) and build the market-sizing model with sourced inputs | Approve the data register; decide the "mobile vs hardware" angle |
| **B. Requirements analysis** | Survey instrument (n=150-250), interview guides, personas, JTBD, stakeholder map, prioritised requirements (MoSCoW), user stories | Draft all of it; build the Google Form questions | Run the survey and 8-10 interviews on campus; it's the one step I can't do for you. It also turns the TAM assumptions into evidence |
| **C. Functional design** | Feature scope for the MVP, user flows, data model, wireframes/clickable prototype, payment and trust flows | Design all of it. Cut to 2 core flows: **rent/buy-sell with QR handover** and **LFG/squad**. Arena is a stretch goal because of the legal risk | Review flows against survey findings |
| **D. Implementation** | Working mobile-web MVP (PWA, mobile-first, deployable fast) with seeded demo data; Razorpay in test mode | Build it | Test it; recruit 20-30 prototype testers |
| **E. Deployment** | Live URL, demo script, final report and deck, KPIs from the pilot | Deploy, write the report and deck | Present it |

**Scope call (YAGNI):** a native React Native/Flutter app is slower to build and harder for the professor to open. I'd build a mobile-first web app (installable as a PWA) and call it a mobile-commerce prototype, unless the class requires an app-store build. Say if it does.

## 5. Decisions I need from you

1. Is a PWA acceptable, or must it be a native app?
2. Can you run primary research (survey plus a few interviews) on campus? This is what makes the project convincing.
3. Which category leads: console/PC rental (the report's idea) or mobile-gaming accessories, tournaments and community (what the data supports)? I recommend leading with the second and keeping rental as a category.

Next, once you approve: Phase A close-out (market-sizing model and evidence doc), then the Phase B survey.
