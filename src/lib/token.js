import { initDb } from '$lib/db.js';
let db;

export async function getToken(token) {
    db = await initDb();

    let match = await db.all('SELECT * FROM token WHERE token = ?',[
        token || 'blah'
    ]);

    let username = match[0] ? match[0].username : '!nobody';

    let valid = await db.all('SELECT * FROM auth WHERE username = ?',[
        username
    ]);

    return {
        username,
        valid: valid[0] ? valid[0].valid : 'noexist'
    };
};