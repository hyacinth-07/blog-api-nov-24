import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import * as dbFunctions from './dbFunctions.js';
import * as types from '../types/types.js';

// create a script that fills the db with a bunch of usable material

export const resetDatabase = async (): Promise<void> => {
	// 1. clean the db
	await prisma.post.deleteMany();
	await prisma.comment.deleteMany();
	await prisma.user.deleteMany();

	// 2. add users

	newUsers.forEach((elem) => {
		dbFunctions.addUser(elem);
		console.log(`Created user: ${elem.name}`);
	});

	// 3. add posts (search for user name, get id)
	// 4. add comments
};

const newUsers: Array<types.User> = [
	{
		name: 'Alice Johnson',
		email: 'alice.johnson@example.com',
		password: 'password123',
		isAuthor: true,
	},
	{
		name: 'Bob Smith',
		email: 'bob.smith@example.com',
		password: 'securePass456',
		isAuthor: false,
	},
	{
		name: 'Charlie Brown',
		email: 'charlie.brown@example.com',
		password: 'mypassword789',
		isAuthor: true,
	},
	{
		name: 'Diana Prince',
		email: 'diana.prince@example.com',
		password: 'wonderWoman987',
		isAuthor: false,
	},
];
