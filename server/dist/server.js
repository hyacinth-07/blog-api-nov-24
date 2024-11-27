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
async function main() { }
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
const secret = process.env.SESSION_SECRET;
// NEW IMPORTS ------
import sessionMiddleware from './auth/session.js';
import passport from './auth/passport.js';
import authRoutes from './auth/routes.js';
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use(express.urlencoded({ extended: false }));
// app.get('/api/logout', (req: Request, res: Response, next: NextFunction) => {
// 	req.logout((err) => {
// 		if (err) return next(err);
// 		res.redirect('/api');
// 	});
// });
///// ROUTES
import blogRoutes from './routes/blogRoutes.js';
app.use('/api', blogRoutes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
