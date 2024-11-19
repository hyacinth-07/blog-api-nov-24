import { Router } from 'express';
const router = Router();
import * as blog from '../controllers/blogController.js';
// MAIN PAGE
router.get('/', blog.mainPage);
// LOG IN (get, post)
// LOG OUT
// INDIVIDUAL ARTICLE PAGE
// POST COMMENTS
export default router;
