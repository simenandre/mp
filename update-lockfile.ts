import type { PackageJson } from "https://esm.sh/v120/types-package-json@2.0.39";

const rawPkg = await Deno.readFile("./package.json").catch(() => {
  // If the file doesn't exist, we exit gracefully
  console.log("No package.json found");
  Deno.exit(0);
});
const pkg = JSON.parse(new TextDecoder().decode(rawPkg)) as PackageJson & {
  packageManager: string;
};

if (pkg.packageManager) {
  if (pkg.packageManager.includes("yarn")) {
    const command = new Deno.Command(Deno.execPath(), {
      args: ["yarn", "install"],
    });

    await command.output();
    Deno.exit(0);
  }

  if (pkg.packageManager.includes("pnpm")) {
    const command = new Deno.Command(Deno.execPath(), {
      args: ["pnpm", "install"],
    });

    await command.output();
    Deno.exit(0);
  }

  throw new Error("Unknown package manager");
}

const yarnLock = await Deno.readFile("./yarn.lock").catch(() => false);

if (yarnLock) {
  const command = new Deno.Command(Deno.execPath(), {
    args: ["yarn", "install"],
  });

  await command.output();
  Deno.exit(0);
}

const pnpmLock = await Deno.readFile("./pnpm-lock.yaml").catch(() => false);

if (pnpmLock) {
  const command = new Deno.Command(Deno.execPath(), {
    args: ["pnpm", "install"],
  });

  await command.output();
  Deno.exit(0);
}
