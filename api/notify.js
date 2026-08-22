// Vercel serverless function: relays a Web Push notification to one or more
// subscriptions. This is the only piece of this app that has to run on a
// server — sending a push requires signing the request with the VAPID
// private key, which can never be exposed to client-side JS, so there's no
// way to do this purely from the browser.
//
// Deliberately dumb: it doesn't know about rooms, Firestore, or game state.
// The client (already synced via its existing Firestore listener) decides
// who to notify and hands over their subscriptions directly, so this
// function needs no database access or credentials beyond the VAPID keys.
//
// Env vars required (set in the Vercel project, never committed):
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY  — from the keypair generated once
//   VAPID_SUBJECT                        — a mailto: or https: contact URL
const webpush = require('web-push');

const MAX_SUBSCRIPTIONS_PER_REQUEST = 20; // friend-group scale, not a public API

module.exports = async function handler(req, res) {
    // Called cross-origin from wherever the app is actually hosted (GitHub
    // Pages), so this needs its own CORS headers — nothing here is secret
    // (the client already had the subscriptions from Firestore), so '*' is
    // fine for a tool this size.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { res.status(204).end(); return; }
    if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }

    const { subscriptions, title, body, data } = req.body || {};

    if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
        res.status(400).json({ error: 'subscriptions must be a non-empty array' });
        return;
    }
    if (subscriptions.length > MAX_SUBSCRIPTIONS_PER_REQUEST) {
        res.status(400).json({ error: `too many subscriptions (max ${MAX_SUBSCRIPTIONS_PER_REQUEST})` });
        return;
    }
    if (typeof title !== 'string' || typeof body !== 'string' || !title || !body) {
        res.status(400).json({ error: 'title and body are required strings' });
        return;
    }

    webpush.setVapidDetails(
        process.env.VAPID_SUBJECT || 'mailto:example@example.com',
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );

    const payload = JSON.stringify({ title, body, data: data || {} });

    // Send to every subscription independently — one dead/expired endpoint
    // (410 Gone, or 404) shouldn't block the others. The client gets back
    // which endpoints failed so it can prune them from the room doc instead
    // of retrying a subscription that will never work again.
    const results = await Promise.all(subscriptions.map(async (sub) => {
        try {
            await webpush.sendNotification(sub, payload);
            return { endpoint: sub.endpoint, ok: true };
        } catch (err) {
            const statusCode = err && err.statusCode;
            return { endpoint: sub.endpoint, ok: false, statusCode, expired: statusCode === 404 || statusCode === 410 };
        }
    }));

    res.status(200).json({ results });
};
