export const logUser = async (req, res, next) => {
    if (req.user === undefined) {
        console.log('no user logged in');
        next();
        return;
    }
    console.log(req.user);
    res.json(req.user);
};
