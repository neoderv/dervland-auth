import { initDb } from '$lib/db.js';
let db;

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    db = await initDb();
    let match = await db.all('SELECT * FROM token WHERE token = ?',[
        params.token || 'blah'
    ]);

    return new Response(JSON.stringify({username: match[0] ? match[0].username : '!nobody'}));
};