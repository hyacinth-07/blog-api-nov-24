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

import * as dbFunctions from './prisma/dbFunctions.js';
import * as types from './types/types.js';

const newUser: types.User = {
	name: 'Carlo',
	email: 'carlo@onio.com',
	password: 'monkey',
	isAuthor: false,
};

async function main() {
	// dbFunctions.addUser(newUser);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

///// ROUTES

import blogRoutes from './routes/blogRoutes.js';
app.use('/api', blogRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
