# mp

Scripts for [microplane](https://github.com/Clever/microplane)

## Migrate to renovate

This snipped assumes you're using [ghq](https://github.com/x-motemen/ghq).

```
mp plan -b simenandre/renovate -m 'chore: move to renovate' -- deno run --allow-write ~/ghq/github.com/simenandre/mp/migrate-to-renovate.ts
```
