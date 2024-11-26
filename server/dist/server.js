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
///// AUTH /////
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
const secret = process.env.SESSION_SECRET;
import * as auth from './auth/auth.js';
app.use(session({
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
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
// login
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        auth.loginUser(username, password, done);
    }
    catch (e) {
        return done(e);
    }
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const rows = await prisma.user.findUnique({
            where: { id: id },
        });
        const user = rows;
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    }
    catch (err) {
        done(err);
    }
});
// authenticate
app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/api',
    failureRedirect: '/api/login',
}));
///// ROUTES
import blogRoutes from './routes/blogRoutes.js';
app.use('/api', blogRoutes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
