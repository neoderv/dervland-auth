import { initDb } from '$lib/db.js';
import { compare } from 'bcrypt'
import { randomBytes } from 'node:crypto';

let db;

/** @type {import('./$types').Actions} */
export const actions = {
    /* todo: not copy this code from the other file */
    default: async ({request}) => {
        db = await initDb();

        const data = await request.formData();

        if (!data) return { 'success': false, 'message': 'No data provided' };

        let user = data.get('user');
        let pass = data.get('pass');

        if (!pass) return { 'success': false, 'message': 'No password provided' };
        if (!user) return { 'success': false, 'message': 'No username provided' };

        let isExist = await db.all('SELECT username, password FROM auth WHERE UPPER(username) LIKE UPPER(?)', [
            user
        ]);

        if (isExist.length < 1) return { 'success': false, 'message': 'Account does not exist' };

        let passHash = await compare(pass,isExist[0].password);

        if (!passHash) 
            return { 'success': false, 'message': 'Incorrect password' };

        let token = randomBytes(32).toString('hex');

        await db.run('INSERT INTO token (username, token, scope) VALUES (?, ?, ?)', [
            user,
            token,
            'main'
        ])

        return { 'success': 'next', 'data': token };
    }
};