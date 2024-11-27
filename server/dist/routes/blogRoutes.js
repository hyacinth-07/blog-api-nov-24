import { Router } from 'express';
const router = Router();
import * as blog from '../controllers/blogController.js';
import * as utils from '../controllers/utilities.js';
// NEED TO DO
// 1. validation middleware
// 2. auth/usercheck middleware
///// NAVIGATION
// MAIN PAGE
router.get('/', utils.logUser, blog.mainPage);
// INDIVIDUAL POST PAGE
router.get('/:postId', blog.onePostPage);
// POST COMMENTS
///// USER PAGES
// USER HOME
router.get('/user/:userId', blog.userHomePage);
///// AUTH /////
// SIGN UP
router.post('/signup', blog.validateSignUp, blog.userSignUp);
// LOG IN (get, post is in server.ts)
// LOG OUT
// router.get('/logout', blog.logOut);
export default router;
