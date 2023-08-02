// @ts-check
import { dirname, join } from 'path';
import glob from 'glob';
import { readFileSync, readdirSync, unlink, unlinkSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { load } from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_DIR = join(__dirname, '..');

const entries = readdirSync(REPO_DIR).filter((dirname) => dirname.length == 1);

for (const entry of entries) {
  console.log(`processing ${entry}`);
  const files = await new Promise((resolve, reject) =>
    glob(`**/definitions.fa.yaml`, { cwd: join(process.cwd(), entry) }, (error, matches) => {
      if (error) {
        reject(error);
      } else {
        resolve(matches);
      }
    }),
  );
  for (const file of files) {
    const [word] = file.split('/').slice(-2);
    const path = join(REPO_DIR, entry, file);
    const definitions = load(readFileSync(path, 'utf8'));
    const json = JSON.stringify({ word, definitions }, null, '\t');
    writeFileSync(`${dirname(path)}/fa.json`, json, 'utf-8');
    unlinkSync(path);
  }
}
debugger;
