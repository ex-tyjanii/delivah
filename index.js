import express from 'express';
import { config } from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import db from './src/utils/db.js';
import router from './src/routes/authRouter.js';
import usersRouter from './src/routes/usersRoutes.js';

const app = express();
app.use(helmet());

config();

// Limit request from same IP
const limit = rateLimit({
	max: 200,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests, please try again in an hour',
});

app.use('/api', limit);
app.use(express.json());

app.use('/api/v1', router, usersRouter);
app.listen(8080, () => {
	db()
		.then(() => console.log('database Connected'))
		.catch((err) => console.log(err));
});
