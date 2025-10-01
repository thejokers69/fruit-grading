// jsx-loader.mjs
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

export async function load(url, context, nextLoad) {
  if (url.endsWith('.jsx')) {
    const source = readFileSync(fileURLToPath(url), 'utf8');
    return {
      format: 'module',
      source,
      shortCircuit: true,
    };
  }
  return nextLoad(url, context);
}