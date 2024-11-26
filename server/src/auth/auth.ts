import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// LOGIN USER

export const loginUser = async (
	username: string,
	password: string,
	done: (
		error: any,
		user?: Express.User | false,
		options?: { message: string }
	) => void
) => {
	const rows = await prisma.user.findUnique({
		where: { name: username },
	});

	const user = rows;

	if (!user) {
		return done(null, false, { message: 'Incorrect username' });
	}

	if (user.password !== password) {
		return done(null, false, { message: 'Incorrect password' });
	}
	return done(null, user);

	// // check hashed passwords
	// const match = await bcrypt.compare(password, user.password);
	// if (!match) {
	// 	// passwords do not match!
	// 	return done(null, false, { message: 'Incorrect password' });
	// }
	// return done(null, user);
};
