import type { PackageJson } from "https://esm.sh/v120/types-package-json@2.0.39";

const rawPkg = await Deno.readFile("./package.json").catch(() => {
  // If the file doesn't exist, we exit gracefully
  console.log("No package.json found");
  Deno.exit(0);
});
const pkg = JSON.parse(new TextDecoder().decode(rawPkg)) as PackageJson & {
  prettier: string;
};

const oldPackageName = "@cobraz/prettier";
const newPackage = {
  name: "@simenandre/prettier",
  version: "3.0.2",
};

// Replace in devDependencies
if (!pkg.devDependencies || !pkg.devDependencies[oldPackageName]) {
  console.log(
    `No ${oldPackageName} found in devDependencies, exiting gracefully`,
  );
  Deno.exit(0);
}

console.log(
  `Replacing ${oldPackageName} with ${newPackage.name} in devDependencies`,
);
pkg.devDependencies[newPackage.name] = newPackage.version;
delete pkg.devDependencies[oldPackageName];

pkg.prettier = "@simenandre/prettier";

await Deno.writeTextFile("./package.json", JSON.stringify(pkg, null, 2) + "\n");
