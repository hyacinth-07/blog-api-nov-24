import { Router } from 'express';
const router = Router();
import passport from 'passport';
router.get('/login', (req, res) => {
    res.json('Can you see this');
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/api/',
    // failureRedirect: '/auth/login',
}));
router.post('/login', passport.authenticate('local'));
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err)
            return next(err);
        res.redirect('/api');
    });
});
export default router;
