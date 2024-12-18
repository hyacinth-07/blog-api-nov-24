///// INIT LIBRARIES /////
import express from 'express';
const app = express();
app.use(express.json());

// CORS
import cors from 'cors';
const allowedOrigins = ['http://localhost:5173', '127.0.0.1:5173'];

app.use(cors({ origin: allowedOrigins, credentials: true }));

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

import sessionMiddleware from './auth/session.js';
import passport from './auth/passport.js';
import authRoutes from './auth/routes.js';

app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.use(express.urlencoded({ extended: false }));

///// ROUTES

// debugging

// app.use((req, res, next) => {
// 	console.log('Session:', req.session);
// 	console.log('User:', req.user);
// 	next();
// });

///

import blogRoutes from './routes/blogRoutes.js';
app.use('/api', blogRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
