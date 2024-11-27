import { Router } from 'express';
const router = Router();
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

router.get('/login', (req, res) => {
	res.send('Can you see this');
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/api/',
		failureRedirect: '/auth/login',
	})
);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
	req.logout((err) => {
		if (err) return next(err);
		res.redirect('/api');
	});
});

export default router;
