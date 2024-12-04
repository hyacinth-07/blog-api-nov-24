import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as dbFunctions from './dbFunctions.js';
// create a script that fills the db with a bunch of usable material
// 1. clean the db
async function clearDb() {
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    await prisma.session.deleteMany();
    console.log('Database Cleared');
}
// 2. add users
async function scriptUsers() {
    newUsers.forEach((elem) => {
        dbFunctions.addUser(elem);
        console.log(`Created user: ${elem.name}`);
    });
}
// 3. add posts (search for user name, get id)
async function scriptPosts() {
    const users = await prisma.user.findMany({
        where: {
            isAuthor: true,
        },
    });
    newPosts.forEach((elem) => {
        const randomIndex = Math.floor(Math.random() * users.length);
        elem.authorId = users[randomIndex].id;
        dbFunctions.addPost(elem);
        console.log(`Created post: ${elem.title}`);
    });
}
// by adding half a second of delay, the db has time to update and return
// more requests. Not very elegant, but it works.
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// 4. add comments
async function scriptComments() {
    const users = await prisma.user.findMany();
    const posts = await prisma.post.findMany();
    newComments.forEach((elem) => {
        // assign random user
        const randomIndex = Math.floor(Math.random() * users.length);
        elem.authorId = users[randomIndex].id;
        // assign random post
        const randomPostIndex = Math.floor(Math.random() * posts.length);
        elem.postCommentId = posts[randomPostIndex].id;
        // insert in db
        dbFunctions.addComment(elem);
        console.log(`Created comment: ${elem.body.substring(0, 20)} ...`);
    });
}
const newUsers = [
    {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'password123',
        isAuthor: true,
    },
    {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: 'securePass456',
        isAuthor: false,
    },
    {
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: 'mypassword789',
        isAuthor: true,
    },
    {
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        password: 'wonderWoman987',
        isAuthor: false,
    },
];
const newPosts = [
    {
        title: 'The Rise of TypeScript',
        body: 'TypeScript has become one of the most popular programming languages for building robust and scalable applications. Ut dictum elit enim, in maximus quam vulputate in. Duis consequat est enim, sed tempor nisl lacinia vitae. Nam molestie sollicitudin mattis. Maecenas dapibus justo non leo scelerisque, sed congue erat tincidunt. Donec mollis odio ut semper iaculis. Quisque ex nibh, pretium id imperdiet sed, hendrerit ut augue. Aenean posuere dolor ut venenatis suscipit. ',
        authorId: '',
        isPublished: true,
    },
    {
        title: 'Understanding Async/Await in JavaScript',
        body: 'Async/await simplifies working with asynchronous code in JavaScript, making it easier to write and debug. Ut dictum elit enim, in maximus quam vulputate in. Duis consequat est enim, sed tempor nisl lacinia vitae. Nam molestie sollicitudin mattis. Maecenas dapibus justo non leo scelerisque, sed congue erat tincidunt. Donec mollis odio ut semper iaculis. Quisque ex nibh, pretium id imperdiet sed, hendrerit ut augue. Aenean posuere dolor ut venenatis suscipit. ',
        authorId: '',
        isPublished: false,
    },
    {
        title: '10 Tips for Writing Clean Code',
        body: 'Writing clean code is essential for maintaining and scaling applications. Here are 10 tips to help you write better code. Ut dictum elit enim, in maximus quam vulputate in. Duis consequat est enim, sed tempor nisl lacinia vitae. Nam molestie sollicitudin mattis. Maecenas dapibus justo non leo scelerisque, sed congue erat tincidunt. Donec mollis odio ut semper iaculis. Quisque ex nibh, pretium id imperdiet sed, hendrerit ut augue. Aenean posuere dolor ut venenatis suscipit. ',
        authorId: '',
        isPublished: true,
    },
];
const newComments = [
    {
        body: 'This is such an insightful post! Thank you for sharing.',
        authorId: 'user1',
        postCommentId: '',
        likes: 45,
        dislikes: 2,
    },
    {
        body: 'I have a different perspective on this topic. Here’s my take...',
        authorId: 'user2',
        postCommentId: '',
        likes: 12,
        dislikes: 5,
    },
    {
        body: 'Amazing explanation, very clear and well-written!',
        authorId: 'user3',
        postCommentId: '',
        likes: 34,
        dislikes: 1,
    },
    {
        body: 'I found this post a bit confusing. Could you clarify?',
        authorId: 'user4',
        postCommentId: '',
        likes: 8,
        dislikes: 3,
    },
    {
        body: 'Great content! I’ll definitely share this with my team.',
        authorId: 'user5',
        postCommentId: '',
        likes: 20,
        dislikes: 0,
    },
    {
        body: 'I disagree with some points, but overall a good read.',
        authorId: 'user6',
        postCommentId: '',
        likes: 15,
        dislikes: 10,
    },
    {
        body: 'Wow, this is exactly what I was looking for! Thanks!',
        authorId: 'user7',
        postCommentId: '',
        likes: 50,
        dislikes: 4,
    },
    {
        body: 'Could you provide more examples next time? Thanks!',
        authorId: 'user8',
        postCommentId: '',
        likes: 5,
        dislikes: 0,
    },
];
// DB CONNECTION
async function main() {
    console.log('--- Initiating database reset ---');
    await clearDb();
    await scriptUsers();
    await delay(1000);
    await scriptPosts();
    await delay(500);
    await scriptComments();
    console.log('--- Database reset successful ---');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
