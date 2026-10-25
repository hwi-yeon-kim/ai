// Re-encrypts the HiMate case study body and writes it into the page.
//
//   HIMATE_PW='new password' node tools/encrypt-gated.mjs <plaintext.html> [page.html]
//
// <plaintext.html> is the unencrypted <section> markup that the password gate reveals.
// Keep it OUTSIDE this repo (the site is public). The page defaults to
// projects/hyundai-competition-award.html. The password is read from the environment
// only, so it never lands in a file or in shell history arguments.
//
// It reuses the encrypt/decrypt helpers from projects/case-study-crypto.js, then checks
// a round trip and that a wrong password is rejected before touching the page.

import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [plainPath, pagePath = path.join(root, 'projects/hyundai-competition-award.html')] = process.argv.slice(2);
const password = process.env.HIMATE_PW;

if (!plainPath || !password) {
    console.error('usage: HIMATE_PW=... node tools/encrypt-gated.mjs <plaintext.html> [page.html]');
    process.exit(1);
}

// Load the site's own helpers; drop the trailing DOM hook, which needs `document`.
const src = fs
    .readFileSync(path.join(root, 'projects/case-study-crypto.js'), 'utf8')
    .replace(/document\.addEventListener[^\n]*\n?$/, '');
const ctx = vm.createContext({ crypto: globalThis.crypto, TextEncoder, TextDecoder, atob, btoa, Uint8Array });
vm.runInContext(`${src}\nthis.encryptPayload = encryptPayload; this.decryptPayload = decryptPayload;`, ctx);

const plaintext = fs.readFileSync(plainPath, 'utf8');
const payload = await ctx.encryptPayload(password, plaintext);

if ((await ctx.decryptPayload(password, payload)) !== plaintext) {
    console.error('round trip failed; page not modified');
    process.exit(1);
}
const wrongAccepted = await ctx.decryptPayload(`${password}x`, payload).then(() => true, () => false);
if (wrongAccepted) {
    console.error('a wrong password decrypted the payload; page not modified');
    process.exit(1);
}

const pattern = /(<script id="gated-payload" type="application\/json">)[\s\S]*?(<\/script>)/;
const page = fs.readFileSync(pagePath, 'utf8');
if (!pattern.test(page)) {
    console.error('gated-payload script not found in page; page not modified');
    process.exit(1);
}
fs.writeFileSync(pagePath, page.replace(pattern, (_, open, close) => open + JSON.stringify(payload) + close));
console.log(`updated ${path.relative(root, pagePath)} (${JSON.stringify(payload).length} bytes of payload)`);
