import { cp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const src = resolve('../analysis');
const dest = resolve('src/content/analyses');

await rm(dest, { recursive: true, force: true });
await cp(src, dest, { recursive: true });
console.log('Synced analysis/ -> src/content/analyses/');