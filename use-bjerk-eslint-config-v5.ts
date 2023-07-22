import type { PackageJson } from "https://esm.sh/types-package-json@2.0.39";
import * as semver from "https://deno.land/std@0.153.0/semver/mod.ts";
import { walk } from "https://deno.land/std@0.153.0/fs/mod.ts";
import { globToRegExp } from "https://deno.land/std@0.194.0/path/glob.ts";

const eslintPackages = [
  "eslint-config-prettier",
  "eslint-plugin-eslint-comments",
  "eslint-plugin-import",
  "eslint-plugin-prettier",
  "eslint-plugin-promise",
  "eslint-plugin-unicorn",
];

function removeEslintDepedencies(pkg: PackageJson): PackageJson {
  for (const eslintPackage of eslintPackages) {
    if (pkg.dependencies) {
      delete pkg.dependencies[eslintPackage];
    }

    if (pkg.devDependencies) {
      delete pkg.devDependencies[eslintPackage];
    }
  }

  return pkg;
}

function isUsingBjerkEslintConfigV5(pkg: PackageJson): boolean {
  if (!pkg.devDependencies) {
    return false;
  }

  if (!pkg.devDependencies["@bjerk/eslint-config"]) {
    return false;
  }

  const minVersion = semver.minVersion(
    pkg.devDependencies["@bjerk/eslint-config"]
  );

  if (!minVersion) {
    return false;
  }

  return semver.satisfies(minVersion, "^5.3.1");
}

const packageFiles = await walk(".", {
  match: [globToRegExp("*/package.json"), globToRegExp("package.json")],
});

for await (const file of packageFiles) {
  const rawPkg = await Deno.readFile(file.path);
  const pkg = JSON.parse(new TextDecoder().decode(rawPkg)) as PackageJson;

  if (!isUsingBjerkEslintConfigV5(pkg)) {
    console.log(
      `${file.path}: Not using @bjerk/eslint-config within range (v5.3.1)`
    );
    continue;
  }

  await Deno.writeTextFile(
    file.path,
    JSON.stringify(removeEslintDepedencies(pkg), null, 2) + "\n"
  );
}
