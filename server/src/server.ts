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
import { resetDatabase } from './prisma/dbScript.js';

async function main() {
	// uncomment if you want to reset the db, but beware
	// I should probably just call the script from NPM, but for now it'll do
	// resetDatabase();
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
