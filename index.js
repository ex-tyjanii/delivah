import express from 'express';
import { config } from 'dotenv';
import db from './src/utils/db.js';
const app = express();
config();
app.use(express.json());
app.listen(3000, () => {
	db()
		.then(() => console.log('database Connected'))
		.catch((err) => console.log(err));
});
