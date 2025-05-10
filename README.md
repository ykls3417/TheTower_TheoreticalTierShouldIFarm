# The Tower - Theoretical Tier Should I Farm

This repo create a tool which helps calculating theoretical farming tier of a player by highest tier wave only.

## Advantages:
1. No external tracking needed
2. Input by highest tier wave record only (To find it, go `Setting -> Stat` or look up in the game main menu)
3. Simplify most of the coin income multiplier (See [Assumption](#assumption))
4. Calculate both ***Theoretical*** coin and cells by time

## Assumption
1. All coin income multiplier is ***universal*** among different tier and set to be zero, including: Packs bought, Themes & Relics, Cards, Modules, Perks, UW Bonus..., e.t.c.. The only coin multiplier taken into the account is `Tier Coin Bonus`. (For example, synced GT/BH/DW are behaving in the same way in T10 and T1.)
2. All non-elite enemy spawn the same in different tier for the ease of calculation (the presence of protector in T2+).
3. Coin penalty for enemy exist more than 3 wave does not exists (Build irrelavance). 
4. More about cards: `Enemy balance` simply adds a enemy amount by percentage depends on cards level. `Wave skip` make no impact for both cell and coin gain. Assume no `Intro Sprint` is used. They still considered in the calculation, but the best farming tier should not change.

## Note
Due the oversimplify assumptions, the theoretical coin calculation does not perfectly fit everyone cases. However, the different should not be large.

## Acknowledgement
Observation and Calculation are from [Spawn Count Calculator - eike23](https://tower.spacewi.de/SpawncountCalc.html).

Game run time crosschecked with [Tower Perk Simulation - Skye](https://tower-perk-simulation.netlify.app/)

Inspired by [What Tier Should I Farm - Skye](https://what-tier-should-i-farm.netlify.app/).