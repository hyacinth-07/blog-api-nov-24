///// INIT LIBRARIES /////
import express from 'express';
const app = express();
app.use(express.json());
// .ENV
import 'dotenv/config';
const port = process.env.PORT;
///// PRISMA CONNECTION /////
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.findMany();
    console.log(user);
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
///// ROUTES
app.get('/', (req, res) => {
    res.send('hello world, tommy');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
