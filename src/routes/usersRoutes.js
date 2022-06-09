import { Router } from 'express';
import {
	acceptRequest,
	declineFriendRequest,
	getAllFriends,
	sendFriendRequest,
} from '../controller/UsersController.js';

const usersRouter = Router();

usersRouter.route('/send-request/:id').put(sendFriendRequest);
usersRouter.route('/accept-request/:id').put(acceptRequest);
usersRouter.route('/decline-request/:id').put(declineFriendRequest);
usersRouter.route('/get-friends/:id').get(getAllFriends);

export default usersRouter;
