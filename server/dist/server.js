///// INIT LIBRARIES /////
import express from 'express';
const app = express();
app.use(express.json());
// .ENV
import 'dotenv/config';
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('hello world');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=server.js.map