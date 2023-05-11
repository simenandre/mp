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

await Deno.writeTextFile(
  "./.github/renovate.json",
  JSON.stringify(renovateConfig, null, 2)
);

const command = new Deno.Command(Deno.execPath(), {
  args: ["prettier", "--write", "./.github/renovate.json"],
});

await command.output();
