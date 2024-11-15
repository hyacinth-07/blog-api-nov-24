///// INIT LIBRARIES /////
import express from 'express';
const app = express();
app.use(express.json());
// .ENV
import 'dotenv/config';
const port = process.env.PORT;
// prisma connect
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
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
////
app.get('/', (req, res) => {
    res.send('hello world, tommy');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
