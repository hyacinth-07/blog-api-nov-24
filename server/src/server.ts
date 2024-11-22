///// INIT LIBRARIES /////
import express from 'express';
const app = express();
app.use(express.json());
// .ENV
import 'dotenv/config';
const port = process.env.PORT;

///// PRISMA CONNECTION /////

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

///// AUTH /////

import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
const secret = process.env.SESSION_SECRET as string;

app.use(
	session({
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000, // ms
		},
		secret: secret,
		resave: true,
		saveUninitialized: true,
		store: new PrismaSessionStore(new PrismaClient(), {
			checkPeriod: 2 * 60 * 1000, //ms
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	})
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

///// ROUTES

import blogRoutes from './routes/blogRoutes.js';
app.use('/api', blogRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
