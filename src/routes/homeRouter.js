import { Router } from 'express';
import {
	createHome,
	deleteHome,
	getAllHomes,
	updateHome,
} from '../controller/homeController.js';

const homeRouter = Router();

homeRouter.route('/home').post(createHome).get(getAllHomes);
homeRouter.route('/home/:id').delete(deleteHome).put(updateHome);

export default homeRouter;
