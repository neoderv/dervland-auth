import { getToken } from "$lib/token";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    let {token} = url.searchParams.get('token');

    return new Response(JSON.stringify(await getToken(token)));
};