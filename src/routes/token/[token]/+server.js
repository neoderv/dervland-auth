import { getToken } from "$lib/token";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    let {token} = params;

    return new Response(JSON.stringify(await getToken(token)));
};