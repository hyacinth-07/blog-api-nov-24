import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
// LOGIN USER
export const loginUser = async (username, password, done) => {
    const rows = await prisma.user.findUnique({
        where: { name: username },
    });
    const user = rows;
    if (!user) {
        return done(null, false, { message: 'Incorrect username' });
    }
    // check hashed passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        // passwords do not match!
        return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
};
