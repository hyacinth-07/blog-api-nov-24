import { Router } from 'express';
const router = Router();
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { userHomePage } from '../controllers/blogController.js';

router.get('/login', (req, res) => {
	res.json('Can you see this');
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/api/',
		// failureRedirect: '/auth/login',
	})
);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
	if (!req.user) {
		console.log('No user logged in');
		return;
	} else {
		req.logout((err) => {
			if (err) return next(err);
			res.redirect('/api');
		});
	}
});

export default router;
