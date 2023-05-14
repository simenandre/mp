# mp

Scripts for [microplane](https://github.com/Clever/microplane)

## Migrate to renovate

A script that migrates a repository from [dependabot](https://dependabot.com/) to [renovate](https://renovatebot.com/).

```shell
deno run --allow-write https://esm.sh/gh/simenandre/mp/migrate-to-renovate.ts
```

To run it with `microplane`:

```shell
mp plan -b simenandre/renovate -m 'chore: move to renovate' -- deno run --allow-write https://esm.sh/gh/simenandre/mp/migrate-to-renovate.ts
```

## Use dependency ranges

A script that migrates a repository from using exact versions to using dependency ranges.

```shell
deno run --allow-write --allow-read https://esm.sh/gh/simenandre/mp/use-dependency-ranges.ts
```

To run it with `microplane`:

```shell
mp plan -b simenandre/dependency-ranges -m 'chore: use dependency ranges' -- deno run --allow-write --allow-read https://esm.sh/gh/simenandre/mp/use-dependency-ranges.ts
```

## Replace package

A script that replaces a package with another package.

Make sure to add a version / tag to the new package.

```shell
deno run --allow-write --allow-read https://esm.sh/gh/simenandre/mp/replace-package.ts old-package new-package@1.0.0
```

To run it with `microplane`:

```shell
mp plan -b simenandre/replace-package -m 'chore: replace package' -- deno run --allow-write --allow-read https://esm.sh/gh/simenandre/mp/replace-package.ts old-package new-package@1.0.0
```

**Note**: You should probably update your lockfile as well!
