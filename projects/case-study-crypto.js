// Client-side password gate for the HiMate case study page.
// This is a casual deterrent, not real security: the ciphertext, salt, and iv
// all ship in the page source, so anyone willing to attack the crypto client-side
// can eventually recover the content. It exists only to keep casual visitors from
// stumbling onto content shared with a specific password, on a static host with
// no server-side auth option.

const PBKDF2_ITERATIONS = 250000;

function base64ToBytes(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

function bytesToBase64(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

async function deriveKey(password, saltBytes) {
    const passwordKey = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveKey']
    );
    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: saltBytes,
            iterations: PBKDF2_ITERATIONS,
            hash: 'SHA-256',
        },
        passwordKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

// Used offline (browser console) to generate the ciphertext payload for a page.
// Not called anywhere in the shipped page.
async function encryptPayload(password, plaintext) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);
    const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        new TextEncoder().encode(plaintext)
    );
    return {
        salt: bytesToBase64(salt),
        iv: bytesToBase64(iv),
        ciphertext: bytesToBase64(new Uint8Array(ciphertext)),
    };
}

async function decryptPayload(password, payload) {
    const salt = base64ToBytes(payload.salt);
    const iv = base64ToBytes(payload.iv);
    const ciphertext = base64ToBytes(payload.ciphertext);
    const key = await deriveKey(password, salt);
    const plaintextBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        ciphertext
    );
    return new TextDecoder().decode(plaintextBuffer);
}

function initPasswordGate() {
    const gate = document.querySelector('.password-gate');
    const gatedContent = document.querySelector('.gated-content');
    const payloadScript = document.getElementById('gated-payload');
    if (!gate || !gatedContent || !payloadScript) {
        return;
    }

    const payload = JSON.parse(payloadScript.textContent);
    const form = gate.querySelector('.password-gate-form');
    const input = gate.querySelector('input[type="password"]');
    const errorEl = gate.querySelector('.password-gate-error');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        errorEl.textContent = '';
        try {
            const plaintext = await decryptPayload(input.value, payload);
            gatedContent.innerHTML = plaintext;
            gatedContent.classList.add('revealed');
            gate.classList.add('hidden');
        } catch (err) {
            errorEl.textContent = 'Incorrect password. Please try again.';
        }
    });
}

document.addEventListener('DOMContentLoaded', initPasswordGate);
