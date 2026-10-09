# GGX (Good Game Exchange): Requirements Analysis (v1)

Date: 2026-10-08. Phase B of 5. Inputs: files 01-03, the original GGX report, the research brief, and the IITD Live and SkillSwap reports.

**Method note.** No primary survey was run. Requirements are **hypothesis-driven**: each one traces to a sourced finding (S), a derived figure (D) or a labelled assumption (A) from files 01-03. The traceability table in Section 9 makes this visible.

---

## 1. Product scope and objectives

**Product:** a responsive web app (mobile and desktop) where verified IIT Delhi students buy, sell and rent gaming gear, find teammates, enter tournaments with QR passes, and earn non-cashable Gaming Credits for contributing to the community.

**Objectives for the pilot (Year 1, IITD only):**

| # | Objective | Measure | Target |
|---|---|---|---|
| O1 | Build a verified gamer base | Verified accounts | 500 (pilot gate), 1,800 (base case) |
| O2 | Prove peer-to-peer commerce works | Completed buy/sell/rent transactions | 30+ in the pilot gate |
| O3 | Run tournaments end-to-end on GGX | Tournaments with registration → QR entry → results | 1 in the pilot, 4+ in Year 1 |
| O4 | Keep trust high | Disputed ÷ total transactions | <5% |
| O5 | Prove the sponsor channel | Sponsored events | 1+ |

## 2. Stakeholders

| Stakeholder | Role | Interest | Influence |
|---|---|---|---|
| Student gamers (players) | Core users | Teammates, tournaments, cheap gear access | High (adoption) |
| Gear owners | Supply side | Earn from idle gear, sell safely | High (liquidity) |
| Buyers / renters | Demand side | Trusted, nearby, cheap | High |
| Gaming societies and organizers (e.g. DMS Esports Fury team) | Arena supply | Registration, brackets, entry, attendance in one tool | High |
| Sponsors (gaming brands, e.g. KRAFTON-type campus tours) | Revenue | Reach verified campus gamers | Medium |
| GGX operator / moderators | Operations | Low disputes, low fraud | High |
| IIT Delhi administration / student bodies | Permission | Rules compliance, student safety | High (veto) |
| Payment gateway (Razorpay test mode) | Partner | Compliant flows | Low |

## 3. Personas (hypothesis personas; fictional, built from secondary data)

| Persona | Profile | Main need | Pain today | Evidence |
|---|---|---|---|---|
| **Riya, the mobile squad-seeker** | 1st-year BTech, plays BGMI 8 hrs/week, mostly 10 PM-2 AM | Find a reliable squad at her skill level; join campus tournaments | Random WhatsApp groups; teammates drop out | S: 74% of Gen Z play 6+ hrs/week (CMR); 90-95% mobile. A: late-night peak (brief, unsourced) |
| **Arjun, the gear owner** | 3rd-year, owns a PS5 and a spare controller and headset | Earn from or sell idle gear without being cheated | Selling on OLX to strangers; no recourse | S: refurbished PS5 ~₹20-25K; Cashify Play rents at ₹499/day. A: idle supply exists on campus |
| **Kabir, the organizer** | Secretary of a gaming society | Run a tournament without 5 separate tools | Google Forms + WhatsApp + screenshots for entry | S: Esports Fury exists; KRAFTON campus tour already reached IITD |
| **Meera, the sponsor manager** | Brand manager at a gaming peripheral brand | Reach verified campus gamers and measure it | One-off campus events with no data after | S: KRAFTON ₹2L+ per host college |
| **Dev, the creator** | Streams and edits clips, casts matches | Recognition and a way to monetise contribution | Contributions are unpaid and invisible | S: 71% watch gaming content, 66% watch livestreams |

## 4. Jobs-to-be-done

| Persona | Job (when … I want to … so I can …) |
|---|---|
| Riya | When I'm online at night, I want to find 3 verified IITD teammates at my rank, so I can play ranked and enter tournaments. |
| Arjun | When my gear sits unused, I want to rent or sell it to a verified student nearby, so I earn money without risking theft. |
| Renter | When I want to try a PS5 or a controller for a weekend, I want to rent it on campus within the hour, so I don't have to buy it. |
| Kabir | When I run a tournament, I want registration, teams, brackets and QR entry in one place, so I spend time on the event, not admin. |
| Meera | When I sponsor a campus event, I want verified reach and attendance data, so I can justify the spend. |
| Dev | When I coach, cast or make clips, I want that recognised and rewarded, so contributing is worth my time. |

## 5. Functional requirements

Priority uses MoSCoW: **M** = must (MVP), **S** = should, **C** = could, **W** = won't (this release).

### 5.1 Identity and Gamer Passport

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Sign up and log in with an IIT Delhi email (`@iitd.ac.in` and its subdomains), verified by a one-time code or magic link | M |
| FR-02 | Gamer Passport profile: name, hostel, games played (start with BGMI, Valorant, plus one more), rank, role, availability | M |
| FR-03 | Passport shows reputation: transactions completed, ratings as seller / buyer / renter, on-time returns, tournaments played | M |
| FR-04 | Badges: verified student, organizer, moderator, top contributor | S |
| FR-05 | Block and report another user | M |

### 5.2 Market: buy, sell, rent

| ID | Requirement | Priority |
|---|---|---|
| FR-10 | Create a listing: category (mobile accessories, controllers, headsets, consoles, PC parts, physical games), title, photos (1-5), condition, price or rent per day, pickup location (hostel / handover point) | M |
| FR-11 | Browse and search listings with filters: category, buy/rent, price, hostel, availability | M |
| FR-12 | Rental availability calendar; renter picks dates, the system blocks double-booking | M |
| FR-13 | Deposit rule per listing value, reduced by the renter's reputation tier (Section 7) | M |
| FR-14 | Promoted listings (paid visibility) | C |
| FR-15 | Bundles (e.g. PS5 + 2 controllers + game) | C |

### 5.3 Handover and trust

| ID | Requirement | Priority |
|---|---|---|
| FR-20 | Each order gets a QR code; scanning it at handover moves the order to "handed over" with a timestamp | M |
| FR-21 | Condition photos required at handover and again at return (rentals) | M |
| FR-22 | Ratings after completion: recommend yes/no + tags, split by role (seller/buyer/renter/owner) | M |
| FR-23 | Dispute workflow: raise within 48 hours of return/receipt, attach evidence, a moderator decides, and the deposit is released or retained accordingly | M |
| FR-24 | Overdue rental reminders and late-fee rule | S |

### 5.4 Payments

| ID | Requirement | Priority |
|---|---|---|
| FR-30 | Checkout with UPI/cards through Razorpay (test mode for the project) | M |
| FR-31 | The platform holds payment until handover is confirmed (escrow-style status), then releases the payout minus commission | M |
| FR-32 | Deposits refunded automatically when a return is confirmed without dispute | M |
| FR-33 | Transaction history and receipts for each user | M |

### 5.5 Gaming Credits (non-cashable)

| ID | Requirement | Priority |
|---|---|---|
| FR-40 | Earn credits for contributions: coaching session completed and rated, organising or casting a match, lending gear on time, approved clip/stream | M |
| FR-41 | Spend credits on Passport cosmetics, priority access, and small discounts (max 10%) on rentals and passes | M |
| FR-42 | Credits **cannot** be bought with money, cashed out, transferred between users, or earned from match wins or stakes | M (legal) |
| FR-43 | Credit ledger visible to the user | M |
| FR-44 | Starter credits for new verified users (cold-start lever) | S |

### 5.6 Squad (teammate finding)

| ID | Requirement | Priority |
|---|---|---|
| FR-50 | Post an LFG request: game, rank, role, time window, casual or competitive | M |
| FR-51 | Matching list of compatible players, sorted by game, rank, availability and reputation | M |
| FR-52 | Create a persistent squad with members and a squad page | S |
| FR-53 | In-app chat | W (link out to Discord/WhatsApp for MVP) |

### 5.7 Arena (tournaments and passes)

| ID | Requirement | Priority |
|---|---|---|
| FR-60 | Organizers create tournaments: game, format, team size, slots, dates, venue (online/offline), prizes, sponsor | M |
| FR-61 | Team registration from existing squads or ad hoc | M |
| FR-62 | Free registration by default. A paid pass is allowed only for offline entry or event costs, never linked to winnings (Section 8) | M |
| FR-63 | QR pass in the user's wallet; organizer scans it at entry | M |
| FR-64 | Brackets and results entry by the organizer; results update the Passport | M |
| FR-65 | Watch-party events (non-competitive) with the same pass flow | S |
| FR-66 | Leaderboards per game | S |

### 5.8 Organizer and sponsor tools

| ID | Requirement | Priority |
|---|---|---|
| FR-70 | Organizer dashboard: registrations, check-ins, attendance rate | M |
| FR-71 | Sponsor placement on a tournament page and in the home feed | S |
| FR-72 | Sponsor report: impressions, registrations, check-ins (aggregated, no personal data) | S |

### 5.9 Home feed and notifications

| ID | Requirement | Priority |
|---|---|---|
| FR-80 | Home feed: new listings near my hostel, LFG matches, upcoming tournaments, my active orders and rentals | M |
| FR-81 | Notifications for order updates, rental due, tournament reminders (email + in-app; web push optional) | M |

### 5.10 Admin and moderation

| ID | Requirement | Priority |
|---|---|---|
| FR-90 | Admin view: users, listings, orders, disputes, reports | M |
| FR-91 | Remove listings and suspend users | M |
| FR-92 | Prohibited-items list enforced at listing time: game accounts, account credentials, gambling/betting, counterfeit goods | M |

**Count:** 44 requirements: 33 must (MVP), 8 should, 2 could, 1 won't.

## 6. Non-functional requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-01 | Platform | Responsive web app; works on mobile browsers (Chrome/Safari) and desktop. Installable as a PWA is a nice-to-have |
| NFR-02 | Performance | Main pages load in <2.5 s on a 4G phone; search results in <1 s for the pilot data size |
| NFR-03 | Usability | A new user can find a rental, a teammate or a tournament in under 90 seconds (the report's prototype test goal) |
| NFR-04 | Security | HTTPS only; passwordless or hashed-password auth; role-based access (student / organizer / admin); payment data handled only by the gateway, never stored |
| NFR-05 | Privacy | Compliant with India's Digital Personal Data Protection Act 2023: consent at sign-up, minimal data, delete-my-account option, no hostel/room number shown publicly (hostel name only) |
| NFR-06 | Legal | Credits non-cashable and not purchasable. No feature for selling or sharing game accounts (Riot and PlayStation terms). No paid entry linked to prize winnings (Online Gaming Act 2025) |
| NFR-07 | Reliability | No lost orders or payments: every payment state change is logged; the payment webhook is idempotent |
| NFR-08 | Auditability | Every high-value transaction keeps an audit trail: identity, payment, deposit, handover QR, condition photos, rating |
| NFR-09 | Accessibility | WCAG 2.1 AA basics: contrast, keyboard navigation, labels, and dark mode (late-night use assumed, per the brief) |
| NFR-10 | Cost | Runs on free or low-cost hosting tiers for the pilot |

## 7. Business rules

| Rule | Value (base, adjustable) | Tier |
|---|---|---|
| Sale commission | 8% (range 5-10%) | A |
| Rental commission | 12% (range 10-15%) | A |
| Deposit: item value under ₹2,000 | 0% for reputation tier 2+, 30% of value for new users | A |
| Deposit: item value ₹2,000-₹15,000 | 20% (tier 2+) / 40% (new) | A |
| Deposit: item value above ₹15,000 (e.g. PS5) | 25% (tier 2+) / 50% (new), capped at ₹10,000 | A |
| Reputation tier 2 | 3+ completed transactions, ≥90% recommended, no lost disputes | A |
| Dispute window | 48 hours after return or receipt | A |
| Credit earning | Coaching session 2, cast/organise a match 3, on-time gear lending 1 per day, approved clip 1 | A |
| Credit value | 1 credit = ₹10 discount, max 10% of an order; cosmetics and priority preferred (zero cost to GGX) | A |
| Payment cost | ~2% of GMV (Razorpay rate card) | S |

## 8. Legal and policy constraints

| Constraint | Source | How GGX complies |
|---|---|---|
| Online Gaming Act 2025: bans online money games; esports fees only for entry/admin and prizes performance-based, no stakes | [Act text](https://lawascode.negd.in/laws/the-promotion-and-regulation-of-online-gaming-act-2025) | Free tournaments by default; prizes sponsor-funded; paid passes only for offline entry/event costs; no wagers |
| Account sharing prohibited by Riot and PlayStation terms | Riot Support; PlayStation India ToS | Game accounts on the prohibited-items list (FR-92) |
| Credits must not become a payment instrument | RBI prepaid instrument rules (design principle) | Credits earned only, never bought or cashed, not transferable (FR-42) |
| DPDP Act 2023 | Government of India | NFR-05 |
| Institutional permissions | IITD student bodies | Pilot positioned as a student project; partner with societies; no use of institute branding without approval |

## 9. Traceability: requirement → evidence

| Requirement(s) | Evidence or assumption |
|---|---|
| FR-01, FR-03, NFR-08 | Closed campus network lowers trust friction (original report); p2p rental trust research (GRIN thesis, Xiaozhu study) |
| FR-10 category list (accessories first) | S: 90-95% of players on mobile; accessories market $3.09B |
| FR-12, FR-13, Section 7 deposits | S: Cashify Play ₹499/day, no deposit, so GGX deposits must be low for good-reputation users |
| FR-40 to FR-44 | S: 71% watch gaming content; mechanism from SkillSwap report; legal design per Section 8 |
| FR-50, FR-51 | S: multiplayer lobbies as social space (research brief); A: late-night peak |
| FR-60 to FR-66 | S: Esports Fury at DMS; KRAFTON campus tour at IITD; Online Gaming Act |
| FR-70 to FR-72 | S: KRAFTON ₹2L+ per host college shows sponsor budgets exist |
| NFR-02, NFR-09 | S: mobile-first audience (CMR, IAMAI); A: late-night use |
| Commission and credit values | A: tested by the sensitivity model in file 03 |

## 10. Out of scope (this release)

Native iOS/Android apps · in-app chat · inter-college tournaments · paid tournament entry linked to prizes · selling digital goods or game accounts · delivery/logistics (handover is in person on campus) · organizer SaaS billing · supporting every game.

## 11. Acceptance criteria for the MVP (used in Phase D testing)

1. A new user verifies with an IITD email and completes a Passport in under 2 minutes.
2. A user lists a controller with photos, and another user rents it, pays (test mode), scans the QR at handover, returns it with photos, and both rate each other. The deposit is refunded and the owner is paid minus 12%.
3. A double-booking of the same rental dates is rejected.
4. An organizer creates a free tournament, two squads register, both receive QR passes, the organizer scans them, and results appear on the players' Passports.
5. A user earns credits for an on-time lending and spends them on a pass discount. Credits cannot be transferred or cashed out.
6. Listing a "Valorant account" is blocked.
7. A dispute raised within 48 hours holds the deposit until a moderator resolves it.

## 12. Key risks carried into design

| Risk | Mitigation in design |
|---|---|
| Low initial liquidity | Start with 3 games and 6 categories; starter credits; seed listings via societies |
| Gear damage or loss | Reputation-tiered deposits, condition photos, 48-hour disputes |
| Legal reclassification of tournaments | Free default, sponsor prizes, no stakes |
| Assumption error (no survey) | Labelled inputs and sensitivity model; KPIs instrumented from day one so real data replaces assumptions |

---

**Next: Phase C, functional design.** User flows for the 3 hero journeys (rent, tournament, LFG), the data model, the screen list and wireframes, and the payment/handover state machines.
