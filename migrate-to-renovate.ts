import { format } from "https://esm.sh/prettier@2.8.8";
import { default as parserBabel } from "https://esm.sh/prettier@2.8.8/parser-babel";

await Deno.mkdir("./.github").catch(() => {
  console.log("Folder .github already exists");
});

// Remove dependabot config
await Deno.remove("./.github/dependabot.yml").catch(() => {
  console.log("No dependabot config found");
});

// Add renovate config
const renovateConfig = {
  $schema: "https://docs.renovatebot.com/renovate-schema.json",
  extends: ["config:base"],
  lockFileMaintenance: { enabled: true, automerge: true },
  rangeStrategy: "replace",
  postUpdateOptions: ["yarnDedupeHighest"],
};

// const prettierConfig = await resolveConfig("./");

await Deno.writeTextFile(
  "./.github/renovate.json",
  format(JSON.stringify(renovateConfig), {
    parser: "json",
    plugins: [parserBabel],
  })
);
