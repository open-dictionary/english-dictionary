// @ts-check
import { join } from 'path';
import glob from 'glob';
import { writeFileSync } from 'fs';

const languages = ['en', 'fa'];

for (const language of languages) {
  console.log(`Processing *.${language}.yaml files`);
  const list = glob.sync(`**/*.${language}.yaml`, {
    cwd: join(process.cwd(), '..'),
  });
  const words = list.map((item) => item.split('/').reverse()[1]).sort();
  writeFileSync(
    join(process.cwd(), '..', `./en-to-${language}.index.csv`),
    words.join('\n'),
    'utf-8',
  );
}

debugger;
