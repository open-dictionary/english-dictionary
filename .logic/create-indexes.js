// @ts-check
import { dirname, join } from 'path';
import glob from 'glob';
import { existsSync, readdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_DIR = join(__dirname, '..');

const words = [];
const entries = readdirSync(REPO_DIR).filter((dirname) => dirname.length == 1);
for (const l1 of entries) {
  const subEntries = readdirSync(join(REPO_DIR, l1)).filter((dirname) => dirname.length == 1);
  for (const l2 of subEntries) {
    const cwd = join(REPO_DIR, l1, l2);
    console.log(`processing ${l1}/${l2}`);
    const list = readdirSync(cwd, { withFileTypes: true });
    if (list.filter((item) => item.name.endsWith('.yaml')).length > 0) {
      words.push(l2);
    }
    const entryWords = list.filter((item) => item.isDirectory()).map((item) => item.name);
    words.push(...entryWords);
    writeFileSync(join(cwd, `./index.csv`), entryWords.join('\n'), 'utf-8');
  }
}
writeFileSync(join(REPO_DIR, `./index.csv`), words.sort().join('\n'), 'utf-8');
