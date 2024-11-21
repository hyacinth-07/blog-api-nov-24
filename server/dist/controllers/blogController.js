import * as dbFunctions from '../prisma/dbFunctions.js';
// MAIN PAGE
export const mainPage = async (req, res) => {
    const posts = await dbFunctions.getAllPosts();
    res.send(posts);
};
export const onePostPage = async (req, res) => {
    const post = await dbFunctions.getOnePost(req.params.postId);
    res.send(post);
};
export const userHomePage = async (req, res) => {
    res.send('Welcome user!');
};
