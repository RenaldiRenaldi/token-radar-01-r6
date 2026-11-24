[![make.fun · token-radar-01](https://make.fun/badge/token-radar-01.svg)](https://make.fun/bounty/token-radar-01?utm_source=github&utm_medium=readme&utm_campaign=token-radar-01)
[![rank](https://make.fun/badge/token-radar-01/RenaldiRenaldi/token-radar-01-r6/rank.svg)](https://make.fun/bounty/token-radar-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=token-radar-01)
[![reward](https://make.fun/badge/token-radar-01/RenaldiRenaldi/token-radar-01-r6/reward.svg)](https://make.fun/bounty/token-radar-01?utm_source=github&utm_medium=readme&utm_campaign=token-radar-01)

# Soundings 05

## Why radar-5 beats radar-4 and the top ranks

Radar-4 improved the held-out fit but ranked only 198 records, used one farm ticket as the headline, and did not measure rank stability. The live leaderboard still has rstrike and nyx77 tied at 965,208. Sudhan advertises whole-snapshot coverage, brisk-kestrel-93 and lufi-aq advertise walk-forward testing, and several entries show costed plans and blind comparable tests. Lufi-aq also shows 200 refits. The repositories are withheld, so the titles establish a comparison point for visible evidence.

Radar-5 will pair complete accounting with a clean launch book, compare shrinkage models on the original leave-one-out population and expose each valuation's drivers and refit range. The snapshot has one observation date. Listing dates can support a purged cohort transfer test, while historical walk-forward returns require historical observations.

The portfolio simulator and liquidity exposure score add decisions the top ten titles do not advertise. The first tests budget allocation under correlated failures and exit shocks. The second reports drawdown, chain concentration and small TVL with explicit missingness. There are no contract controls, holder data, launch dates, social metrics or measured gas quotes in the snapshot.

## Validation

| Comparable test | Median miss | Within 3× |
| --- | ---: | ---: |
| Radar-3 published size-only fit | ×3.36 | 52/119 (43.7%) |
| Radar-4 nested fit | ×3.11 | 59/119 (49.6%) |
| Radar-5 sector and category shrinkage with nested feature selection | ×3.15 | 58/119 (48.7%) |

The requested accuracy targets were missed. The test uses the same November 14 snapshot and the same 119 positive-cap, positive-TVL, non-CEX comparables as radar-4. Each protocol is removed once. Five inner folds group by CoinGecko ID and select a feature set using capped absolute log error. The selected model refits on the remaining 118 rows. The outer metric counts each protocol separately for comparability with radar-4, so two protocols with a shared token can still appear in opposite outer sets.

The production model uses the positive-cap records with a CoinGecko ID. All 119 comparables satisfy this extra screen here. Market depth and executable prices are unobserved. Ridge penalties shrink correlated sector and category effects and limit exposure to weak growth and age signals. Huber weights douse extreme residuals. The terminal independently reconstructs each fitted cap by summing its log contributions and exponentiating.

| Listing cohort | Train / validation | Protocols in test | Median cap miss | Within 3× |
| --- | ---: | ---: | ---: | ---: |
| 2023 | 3 / 12 | 85 | ×2.71 | 9/18 |
| 2024 | 19 / 16 | 150 | ×2.58 | 9/18 |
| 2025 | 37 / 18 | 180 | ×2.56 | 12/21 |
| 2026 | 57 / 20 | 143 | ×7.66 | 3/9 |

This is a listing-cohort transfer test on current caps and current features. A 30-day gap precedes each validation and test boundary. Training excludes validation token IDs, and both earlier sets exclude test token IDs. For the sparse 2023 training window, a pooled size fit is preselected, then refitted after pooling training and validation. There are 558 cohort predictions, with 66 observed anchor caps for error scoring. The ledger records 113 missing listing dates and 87 dates outside the test windows. Historical observations would be required to measure real walk-forward forecast error.

The model runs 256 fixed-seed token-block bootstrap refits of the selected specification. Sentora Curator spans ranks 1–6 with central 80% ranks 1–3. Steakhouse Financial spans 1–8 with central ranks 1–4. Gauntlet spans 2–24 with central ranks 3–9. Bootstrap ranges measure model stability. Separate signed residual bands show the central 80% of held-out log errors around each point estimate.

Stability belongs to ranks among today's 198 launch candidates. In a bootstrap draw, comparable tokens are resampled as blocks and candidate ordering is recalculated. It is not a posterior probability that a rank is correct.

## Coverage and farm math

The board ranks 198 launch candidates with all 40 watchlist rows. The universe ledger gives fitted diagnostics, provenance and a cost curve to all 758 protocols, including 119 anchors and 441 quarantined records. Those 560 rows have a skip route and no modeled pre-launch proceeds.

The default scenario uses a 30-day deposit, a 25% joint chance of a qualifying distribution, and a hypothetical 10% pro rata depositor allocation. The assumed share is ticket divided by TVL plus ticket. Subtract four chain-priced transactions, 0.30% total slippage and 4% annual carry. The least expensive listed chain is selected under assumed fees of $0.05 per transaction on Solana, $0.30 on the listed lower-cost networks, $12 on Ethereum and $1 elsewhere. Verify deployment and supported assets before using a route. Model costs exclude asset losses, bridge fees and product charges. The portfolio view adds shared no-distribution, exit-cost and principal-loss scenarios.

Run with Node 22 and the sealed input directory:

```sh
node main.ts --input /path/to/kit/input --output /tmp/soundings
```

Open `/tmp/soundings/dashboard/index.html` offline. The ranked book, full ledger and fold log are downloadable from the page. Board and validation captures are committed assets under `captures/`, and the graded entry reads them directly.
