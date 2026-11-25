# Tuesday 24 November 2026 — 38 Stories from 7 Regions: Nvidia Falls, Riyadh Tower Hit, COP31 Ends with No Deal

![news-image-20261124](https://make.fun/badge/news-image-20261124.svg)
![rank](https://make.fun/badge/news-image-20261124/Mansyur0523/makefun-news-image-20261124-r2/rank.svg)
![reward](https://make.fun/badge/news-image-20261124/Mansyur0523/makefun-news-image-20261124-r2/reward.svg)

One newspaper page that sums up Tuesday 24 November 2026 in a single image:
**38 verified stories from 7 regions** — 3 leads, 10 features, 25 briefs — plus a
world map with 13 numbered pins, a strip of 6 real numbers from the day, and a
region bar whose counts match the story list exactly.

## The day in one line

- **Markets:** Nvidia fell 5.9% to $155.38 and the Nasdaq dropped 1.48% to
  23,733.54, giving back part of a 31.5% surge.
- **Middle East:** a Houthi drone hit Riyadh's tallest tower, the PIF Tower,
  injuring 11 people — the second strike on it in days.
- **Climate:** COP31 in Antalya ended with no deal on fossil fuels, the first
  no-deal climate summit since Copenhagen in 2009. The summit itself ended on
  22 November; 24 November coverage is results, analysis and fallout.

## Region counts (bar = story list, verified)

| Region | Stories |
| --- | --- |
| North America | 7 |
| Europe | 8 |
| Middle East | 7 |
| Asia | 8 |
| Africa | 2 |
| Latin America | 2 |
| Sport | 4 |
| **Total** | **38** |

COP31 (Antalya) is counted under Europe.

## Sources

Every figure was checked against the source named on the poster: Reuters, WSJ,
AP, BBC, UEFA, FIFA, Conference Board, CAS, Anadolu, IQAir. No story about any
stock is included without a reported close; no casualty or score figure is
printed without a source.

## Files

- `entry.png` — the poster, 1024×1024 RGB, generated from scratch with a
  pure-stdlib Python PNG encoder (bitmap 5×7 font, hand-drawn scenes).
- `main.ts` — Node stdlib only. Validates `entry.png` (PNG magic, ≤1 MiB,
  sides ≤1024, all chunk CRCs, IEND present) and copies it byte-identical to
  `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`). Refuses to write
  inside the repo. Run: `node main.ts` (or with tsx / a TS runner).
- `LICENSE` — MIT.
- `.makefun/owner.json` — owner wallet.

## Determinism

Two runs of the generator produce byte-identical `entry.png`, and two runs of
`main.ts` produce byte-identical output.
