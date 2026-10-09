# GGX: Market Sizing + Evidence Plan Without a Primary Survey (v1)

Date: 2026-10-08. Constraints agreed: web app (mobile + desktop), no native app, no primary research for now.

## 1. How we handle "no survey"

We cannot invent survey results. Instead, the evidence for GGX has three tiers, and every number is tagged with its tier:

| Tier | Meaning | Example |
|---|---|---|
| **S: sourced** | Published figure with a link | 591M Indian gamers (Lumikai) |
| **D: derived** | Calculated from sourced figures | ~41% national gamer penetration = 591M ÷ ~1.45B people |
| **A: assumption** | Our judgement, shown with a low/base/high range and tested by sensitivity | Share of IITD gamers who become active users |

The professor sees exactly what is evidence and what is a hypothesis. The model is explicit about which assumptions matter most, and Section 4 tells you which ones to validate first if you ever get 15 minutes.

## 2. New secondary evidence

| Finding | Source | Use in GGX |
|---|---|---|
| KRAFTON's Esports College Campus Tour (2025) puts over ₹2 crore of prize pool into campuses, with each host college getting over ₹2 lakh. IIT Delhi is among the campuses already engaged | [KRAFTON India](https://krafton.in/news/krafton-india-unveils-esports-roadmap-for-h1-2025-commits-%E2%82%B94-crore-prize-pool) | **Strong evidence that brands already pay to reach campus gamers, and that IITD is a known stop.** It supports the sponsor and organizer side. GGX is the persistent layer between the one-off events |
| BGMI College Rivals S2: ₹50 lakh prize pool (Feb 2025) | [Krafton / iQOO community](https://community.iqoo.com/in/thread/75815) | Collegiate esports is institutionally funded in India |
| Mobile phone accessories market $3.09B (2024), ~4.65% CAGR; brands are launching gaming controllers, stands and cooling pads | [OpenPR](https://www.openpr.com/news/4012274/india-mobile-phone-accessories-market-2025-industry-size) (low confidence) | Accessories are a real, growing category and the right lead for our listings |
| Gaming peripherals market $531M (2025) | [IMARC](https://www.imarcgroup.com/india-gaming-peripherals-market) | Context only; vendor-report quality |
| Trust in p2p rental can be improved by reputation scores, reducing reliance on large deposits | Thesis summary via search results ([GRIN](https://www.grin.com/document/442456)); Xiaozhu.com credit-score study | Academic support for our "reputation replaces most of the deposit" claim. Needs a better citation before final submission |
| UPI AutoPay stays free; P2M UPI up to ₹2,000 has zero MDR, a 0.4% MDR applies above ₹2,000 from 15 Oct 2026; Razorpay's rate card is ~2% | [Motilal Oswal](https://www.motilaloswal.com/learning-centre/2026/9/upi-mdr-charges-from-october-15-rules-rates-and-impact-on-users) (verify with NPCI/Razorpay) | Payment cost assumption of 2% of GMV in the model (conservative) |
| EY India esports forecast (2021 report): ₹11B revenue and 85M viewers by 2025 | [EY India](https://ey.com/en_in/news/2021/06/esports-industry-expected-to-grow-four-fold-to-inr-11-billion-by-2025) | Old forecast; cite as a projection, not as a 2025 fact |

**Still unfilled:** IITD-specific gaming ownership and spend, rental damage rates, and sponsor willingness to pay at a single-campus level. These stay as labelled assumptions.

## 2b. Published surveys used in place of our own survey

| Survey | Sample | Finding we use | GGX implication |
|---|---|---|---|
| [CyberMedia Research (CMR), May 2025](https://www.etvbharat.com/en/!technology/74-percent-indian-gen-z-users-spend-6-hours-every-week-gaming-on-phones-survey-enn25050304261) | 1,550 users, Tier 1-3 cities incl. Delhi | 74% of Gen Z spend 6+ hrs/week gaming on phones | Mobile is the mass segment: Squad + Arena + accessories |
| [HP India Gaming Landscape study](https://www.digit.in/features/gaming/hp-study-genz-gamer-dominate.html) | 3,500 respondents, 15 cities | 74% of Gen Z gamers are "serious" gamers; among them 67% prefer PC; willing to spend ₹1L+ on a gaming PC; 61% want to be gaming influencers, 60% streamers | A smaller, high-value *serious* segment wants expensive hardware, which supports keeping console/PC rental. The creator ambition supports Gaming Credits for clips/streams |
| [YouGov Consumer Electronics 2023](https://yougov.com/articles/44991-six-ten-urban-indians-have-either-bought-or-would-) | Urban Indians | 20% have bought refurbished electronics; 40% more would consider it (6 in 10 total) | Resale demand is mainstream, not niche |
| Global Gen Z refurbished survey, Sept 2025 ([ANSA press release](https://www.ansa.it/amp/pressrelease/english/2025/09/10/gen-z-leads-the-way-on-buying-refurbished-devices_65053699-837e-454f-b5e0-b45324a3e038.html)) | Europe/US | 37% of Gen Z have bought a refurbished smartphone vs 18% of boomers | Gen Z is the most second-hand-friendly generation |

**Reconciling CMR (90%+ mobile) with HP (67% prefer PC):** HP surveyed *serious* gamers and CMR surveyed the general population. Both can be true: mobile is the mass market, PC/console is the high-value niche. GGX serves the mass segment with Squad, Arena and accessories, and monetises the niche with rentals. This is a stronger segmentation story than either report alone.

**Still unconfirmed:** the brief's "10 PM-2 AM peak" claim did not appear in the CMR coverage I found. Keep it out of the pitch until it has a source.

## 3. Year-1 SOM for IIT Delhi (bottom-up, scenario model)

Formula: students × gamer share × active-user share × GMV per active user × take rate.

| Input | Low | Base | High | Tier |
|---|---|---|---|---|
| Students on campus | 12,000 | 12,000 | 12,000 | S (IITD alumni page) |
| Gamer share | 40% | 50% | 65% | D/A (national penetration is ~41%; students skew higher) |
| Share of gamers who become active GGX users | 15% | 30% | 45% | A |
| GMV per active user per year | ₹600 | ₹1,200 | ₹2,000 | A (accessories, passes, rentals, resale) |
| Blended take rate | 8% | 10% | 12% | A |
| Event sponsorship (pilot) | ₹0 | ₹1L | ₹3L | A (KRAFTON's ₹2L+ per host campus shows the order of magnitude) |
| Payment cost | 2% | 2% | 2% | S/D |

| Output | Low | Base | High |
|---|---|---|---|
| Active users | ~720 | ~1,800 | ~3,510 |
| GMV | ₹4.3L | ₹21.6L | ₹70.2L |
| Commission revenue | ₹0.35L | ₹2.2L | ₹8.4L |
| Revenue incl. sponsorship | ₹0.35L | ₹3.2L | ₹11.4L |
| Net of payment cost | ₹0.26L | ₹2.7L | ₹10.0L |

**Note against the original report:** its ₹82.5L GMV is above our *high* case (₹70L) because it assumed 3,000 active users at ₹2,500 each. We replace it with this range. Presenting a lower, defensible base case is more credible than the original optimistic one.

**Bigger-picture context (not a TAM claim):** India's gaming market is $3.8B → $9.2B by 2029 (Lumikai), and 8M of 591M gamers pay. Take these as category context only. The relevant market is campus gaming commerce, and that is what the SOM above measures.

## 4. Which assumptions to validate first (if time ever allows)

Ranked by how much they change the result:
1. **Active-user share** (15% → 45%): the largest swing, about 3x on GMV.
2. **GMV per active user** (₹600 → ₹2,000): about 3.3x.
3. **Gamer share**: smaller effect.

A 5-question WhatsApp poll in two or three gaming/hostel groups would cover both of the top two: "do you play weekly / would you rent or buy used accessories on campus / how much do you spend a year on gaming gear". It takes a few minutes and I can write it for you. It is optional; the plan works without it.

## 5. What this means for the project

- The pitch shifts from "a big market" to **"a defensible pilot with a sensitivity-tested model and a named sponsor channel"**.
- The sponsor and organizer side (KRAFTON-type brands, societies) is the strongest evidenced revenue source. Commission on peer-to-peer gear is the weakest. Lead the demo with Arena and QR passes, and keep gear listings as the transactional core.
- Success gates for the pilot (from the original roadmap, kept): 500 verified users, 50+ listings, 30+ completed transactions, <5% disputes.

## 6. Next step: Phase B (requirements) and Phase C (design), built from secondary evidence

Since there is no survey, I'll write requirements as **hypothesis-driven**: personas and jobs-to-be-done based on the reports and sourced data, user stories with priorities (MoSCoW), non-functional requirements (security, privacy, legal), and a traceability table from each requirement to the evidence or assumption it relies on. Say "go" and I'll start with the requirements document.
