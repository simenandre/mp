# mp

Scripts for [microplane](https://github.com/Clever/microplane)

## Migrate to renovate

```shell
deno run --allow-write https://esm.sh/gh/simenandre/mp/migrate-to-renovate.ts
```

To run it with `microplane`:

```shell
mp plan -b simenandre/renovate -m 'chore: move to renovate' -- deno run --allow-write https://esm.sh/gh/simenandre/mp/migrate-to-renovate.ts
```

## Use dependency ranges

```shell
deno run --allow-write --allow-read https://esm.sh/gh/simenandre/mp/use-dependency-ranges.ts
```

To run it with `microplane`:

```shell
mp plan -b simenandre/dependency-ranges -m 'chore: use dependency ranges' -- deno run --allow-write --allow-read https://esm.sh/gh/simenandre/mp/use-dependency-ranges.ts
```

