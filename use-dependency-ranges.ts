import type { PackageJson } from "https://esm.sh/v120/types-package-json@2.0.39";

const rawPkg = await Deno.readFile("./package.json").catch(() => {
  // If the file doesn't exist, we exit gracefully
  console.log("No package.json found");
  Deno.exit(0);
});
const pkg = JSON.parse(new TextDecoder().decode(rawPkg)) as PackageJson;

const isRanged = (version: string) =>
  version.includes("^") || version.includes("~");

if (pkg.dependencies) {
  for (const [name, version] of Object.entries(pkg.dependencies)) {
    if (!isRanged(version)) {
      console.log(`Dependency ${name} is not ranged`);
      pkg.dependencies[name] = `^${version}`;
    }
  }
}

if (pkg.devDependencies) {
  for (const [name, version] of Object.entries(pkg.devDependencies)) {
    if (!isRanged(version)) {
      console.log(`Dependency ${name} is not ranged`);
      pkg.devDependencies[name] = `^${version}`;
    }
  }
}

await Deno.writeTextFile(
  "./package.json",
  JSON.stringify(pkg, null, 2) + "\n",
);

