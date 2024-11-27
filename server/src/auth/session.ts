import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
const secret = process.env.SESSION_SECRET as string;

const sessionMiddleware = session({
	cookie: {
		maxAge: 2 * 60 * 60 * 1000, // ms, two hours
	},
	secret: secret,
	resave: true,
	saveUninitialized: true,
	store: new PrismaSessionStore(new PrismaClient(), {
		checkPeriod: 2 * 60 * 1000, //ms
		dbRecordIdIsSessionId: true,
		dbRecordIdFunction: undefined,
	}),
});

export default sessionMiddleware;
