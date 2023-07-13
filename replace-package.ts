import type { PackageJson } from "https://esm.sh/v120/types-package-json@2.0.39";
import { parse } from "https://esm.sh/v121/parse-package-name@1.0.0/deno/parse-package-name.mjs";

const rawPkg = await Deno.readFile("./package.json").catch(() => {
  // If the file doesn't exist, we exit gracefully
  console.log("No package.json found");
  Deno.exit(0);
});
const pkg = JSON.parse(new TextDecoder().decode(rawPkg)) as PackageJson;

const oldPackageName = Deno.args[0];
const newPackage = parse(Deno.args[1]);

if (!oldPackageName || !newPackage.name || !newPackage.version) {
  console.log({
    oldPackageName,
    newPackageName: newPackage.name,
    newPackageVersion: newPackage.version,
  });
  throw new Error(
    "Usage: deno run --allow-read --allow-write replace-package.ts <old-package-name> <new-package-name>@<version or scope>",
  );
}

// Replace in dependencies
if (pkg.dependencies && pkg.dependencies[oldPackageName]) {
  console.log(
    `Replacing ${oldPackageName} with ${newPackage.name} in dependencies`,
  );
  pkg.dependencies[newPackage.name] = newPackage.version;
  delete pkg.dependencies[oldPackageName];
}

// Replace in devDependencies
if (pkg.devDependencies && pkg.devDependencies[oldPackageName]) {
  console.log(
    `Replacing ${oldPackageName} with ${newPackage.name} in devDependencies`,
  );
  pkg.devDependencies[newPackage.name] = newPackage.version;
  delete pkg.devDependencies[oldPackageName];
}

await Deno.writeTextFile("./package.json", JSON.stringify(pkg, null, 2) + "\n");
