import { Router } from 'express';
const router = Router();
import * as blog from '../controllers/blogController.js';

// NEED TO DO
// 1. validation middleware
// 2. auth/usercheck middleware

///// NAVIGATION

// MAIN PAGE
router.get('/', blog.mainPage);

// INDIVIDUAL POST PAGE
router.get('/:postId', blog.onePostPage);

// POST COMMENTS

///// USER PAGES

// USER HOME
router.get('/user/:userId', blog.userHomePage);

///// AUTH /////

// SIGN UP

// LOG IN (get, post)

// LOG OUT

export default router;
