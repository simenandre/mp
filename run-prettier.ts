import type { PackageJson } from "https://esm.sh/v120/types-package-json@2.0.39";

const rawPkg = await Deno.readFile("./package.json").catch(() => {
  // If the file doesn't exist, we exit gracefully
  console.log("No package.json found");
  Deno.exit(0);
});

const pkg = JSON.parse(new TextDecoder().decode(rawPkg)) as PackageJson;

// TODO: Add support for installing dependencies first

// if (pkg.scripts && pkg.scripts["format"]) {
//   const command = new Deno.Command(Deno.execPath(), {
//     args: ["npm", "run", "format"],
//   });

//   await command.output();

//   Deno.exit(0);
// }

if (
  (pkg.devDependencies && pkg.devDependencies["prettier"]) ||
  (pkg.dependencies && pkg.dependencies["prettier"])
) {
  const command = new Deno.Command("prettier", {
    args: ["--write", "./"],
  });

  await command.output();

  Deno.exit(0);
}
