const minChar = 1;
const maxChar = 32;

import { initDb } from '$lib/db.js';
import { hash } from 'bcrypt'

function isValid(user) {
    return user.search(/[^A-Za-z0-9\-\_]/g) == -1;
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, getClientAddress }) => {
        const db = await initDb();

        const data = await request.formData();

        if (!data) return { 'success': false, 'message': 'No data provided' };

        let user = data.get('user');
        let pass = data.get('pass');
        let pass2 = data.get('pass2');

        if (pass != pass2) return { 'success': false, 'message': 'Passwords do not match' };

        if (!pass) return { 'success': false, 'message': 'No password provided' };

        if (!isValid(user)) return { 'success': false, 'message': 'Username is invalid' };

        if (user.length < minChar || user.length > maxChar)
            return { 'success': false, 'message': `Username must be ${minChar} to ${maxChar} characters` };

        let isExist = await db.all('SELECT username FROM auth WHERE UPPER(username) LIKE UPPER(?)', [
            user
        ]);

        if (isExist.length > 0) return { 'success': false, 'message': 'Account already exists' };

        var passHash = await hash(pass, 10);

        await db.run('INSERT INTO auth (username, password, ip) VALUES (?, ?, ?)', [
            user,
            passHash,
            getClientAddress()
        ]);

        return { 'success': false, 'message': 'Account created!' };

    }
};