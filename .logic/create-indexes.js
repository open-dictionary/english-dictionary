// @ts-check
import { dirname, join } from 'path';
import glob from 'glob';
import { readdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_DIR = join(__dirname, '..');

const languages = ['en', 'fa'];

for (const language of languages) {
  console.log(`Processing *.${language}.yaml files`);
  const words = [];
  const entries = readdirSync(REPO_DIR).filter((dirname) => dirname.length == 1);
  for (const l1 of entries) {
    const subEntries = readdirSync(join(REPO_DIR, l1)).filter((dirname) => dirname.length == 1);
    for (const l2 of subEntries) {
      const cwd = join(REPO_DIR, l1, l2);
      console.log(cwd);
      const list = glob
        .sync(`**/definitions.${language}.yaml`, { cwd })
        .map((item) => {
          const word = item.split('/').shift();
          return word?.endsWith(`${language}.yaml`) ? l1 : word;
        })
        .sort();
      words.push(...list);
      writeFileSync(join(cwd, `./en-to-${language}.index.csv`), list.join('\n'), 'utf-8');
    }
  }
  writeFileSync(join(REPO_DIR, `./en-to-${language}.index.csv`), words.sort().join('\n'), 'utf-8');
}

debugger;
