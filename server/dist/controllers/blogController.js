import * as dbFunctions from '../prisma/dbFunctions.js';
import { body, validationResult } from 'express-validator';
// MAIN PAGE
export const mainPage = async (req, res) => {
    const posts = await dbFunctions.getAllPosts();
    res.send(posts);
};
// SINGLE ARTICLE PAGE
export const onePostPage = async (req, res) => {
    const post = await dbFunctions.getOnePost(req.params.postId);
    res.send(post);
};
// USER HOME PAGE
export const userHomePage = async (req, res) => {
    res.send('Welcome user!');
};
// SIGN UP
export const validateSignUp = [
    body('username')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Username is required')
        .escape(),
    body('password')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Password is required')
        .escape(),
    body('email')
        .trim()
        .isLength({ min: 1 })
        .isEmail()
        .withMessage('Email is required')
        .escape(),
];
export const userSignUp = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const confirmPassword = req.body.confirmPassword;
    if (password != confirmPassword) {
        res.send('Passwords do not match');
        return;
    }
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.send({ errors: validationErrors.array() });
        return;
    }
    else {
        try {
            // right now the function allows only for commenter role
            // author log in to be implemented in the future
            const newUser = {
                name: username,
                email: email,
                password: password,
                isAuthor: false,
            };
            await dbFunctions.addUser(newUser);
            res.redirect('/');
        }
        catch (e) {
            return next(e);
        }
    }
};
// LOG OUT
export const logOut = async (req, res, next) => {
    req.logout((error) => {
        if (error)
            return next(error);
    });
    res.redirect('/');
};
