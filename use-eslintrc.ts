import { walk } from "https://deno.land/std@0.153.0/fs/mod.ts";
import { globToRegExp } from "https://deno.land/std@0.194.0/path/glob.ts";

const rawPkg = await Deno.readFile("./package.json").catch(() => {
  // If the file doesn't exist, we exit gracefully
  console.log("No package.json found");
  Deno.exit(0);
});
const pkg = JSON.parse(new TextDecoder().decode(rawPkg)) as {
  eslintConfig?: string;
};

pkg.eslintConfig = undefined;

await Deno.writeTextFile("./package.json", JSON.stringify(pkg, null, 2) + "\n");

const oldEslintFiles = await walk(".", {
  match: [globToRegExp(".eslintrc.*")],
});

await Deno.remove(".eslintrc").catch(() => {});

for await (const file of oldEslintFiles) {
  await Deno.remove(file.path);
}

const eslintConfig = `/**
 * @type {import('eslint').Linter.Config}
 **/

module.exports = {
  extends: ['@bjerk/eslint-config'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};
`;

await Deno.writeTextFile(".eslintrc.cjs", eslintConfig);
