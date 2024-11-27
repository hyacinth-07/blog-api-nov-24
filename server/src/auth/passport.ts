import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as auth from './auth.js';

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			auth.loginUser(username, password, done);
		} catch (e) {
			return done(e);
		}
	})
);

// serialize/deserialize

import * as types from '../types/types.js';

passport.serializeUser(
	(user: types.UserLogin, done: (err: any, id?: unknown) => void) => {
		done(null, user.id);
	}
);

passport.deserializeUser(
	async (id: string, done: (err: any, user?: types.User | false) => void) => {
		try {
			const rows = await prisma.user.findUnique({
				where: { id: id },
			});
			const user = rows;

			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		} catch (err) {
			done(err);
		}
	}
);

export default passport;
