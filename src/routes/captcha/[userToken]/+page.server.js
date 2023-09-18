import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import { initDb } from '$lib/db.js';
import { getToken } from "$lib/token";

const key = "29342a79-570e-47ed-bbe6-167ab6cacc34";

let db;

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params }) => {
        db = await initDb();

        const data = await request.formData();

        let token = data.get('h-captcha-response');

        let succ = await fetch("https://hcaptcha.com/siteverify", {
            'method': 'POST',
            'headers': {
                'content-type': 'application/x-www-form-urlencoded'
            },
            'body': `response=${encodeURIComponent(token)}&secret=${encodeURIComponent(env.HCAPTCHA_SECRET)}&sitekey=${encodeURIComponent(key)}`
        }).then(x => x.json());

        let { userToken } = params;

        if (!succ || !succ.success) throw redirect(302, `/captcha/${userToken}`);

        await db.run('UPDATE auth SET valid = ? WHERE username = ?', [
            'verified',
            (await getToken(userToken)).username
        ])

        throw redirect(302, '/');
    }
}