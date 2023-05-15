const rawPkg = await Deno.readFile("./package.json").catch(() => {
  // If the file doesn't exist, we exit gracefully
  console.log("No package.json found");
  Deno.exit(0);
});
const pkg = JSON.parse(new TextDecoder().decode(rawPkg)) as {
  prettier: string;
};

const configName = Deno.args[0];

if (!configName) {
  throw new Error(
    "Usage: deno run --allow-read --allow-write set-prettier.ts <config-name>"
  );
}

pkg.prettier = configName;

await Deno.writeTextFile("./package.json", JSON.stringify(pkg, null, 2) + "\n");
