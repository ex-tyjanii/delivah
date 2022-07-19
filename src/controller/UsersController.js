import User from '../model/User.js';

export const sendFriendRequest = async (req, res) => {
	try {
		// Person you are sending the request to
		const user_id = req.params.id;
		// Person sending request
		const currentUser_id = req.body.id;
		let user = await User.findById(user_id);
		if (!user || !currentUser_id) {
			return res.status(401).json({
				status: 'fail',
				message: 'User does not exist',
			});
		}
		if (!user.friends.includes(currentUser_id)) {
			user = await user.updateOne({ $push: { requests: currentUser_id } });
			return res.status(201).json({
				status: 'success',
				data: user,
			});
		} else {
			return res.status(403).json({
				status: 'fail',
				message: 'You already follow this user',
			});
		}
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'something went wrong',
		});
	}
};

export const acceptRequest = async (req, res) => {
	try {
		// Person that sent the request
		const user_id = req.params.id;
		// Person reviewing request
		const currentUser_id = req.body.id;
		const currentUser = await User.findById(currentUser_id);

		// Get user whose request us being reviewed
		const user = await User.findById(user_id);
		if (!currentUser) {
			return res.status(401).json({
				status: 'fail',
				message: 'User does not exist',
			});
		}
		if (
			!currentUser.friends.includes(user_id) &&
			currentUser.requests.includes(user_id)
		) {
			await currentUser.updateOne({
				$push: { friends: user_id },
				$pull: { requests: user_id },
			});
			await user.updateOne({ $push: { friends: currentUser_id } });
			user.requests.includes(currentUser_id)
				? await user.updateOne({ $pull: { requests: currentUser_id } })
				: null;
			return res.status(201).json({
				status: 'success',
				data: 'Friend request accepted',
			});
		} else if (currentUser.friends.includes(user_id)) {
			return res.status(403).json({
				status: 'fail',
				message: 'You are already friends with user',
			});
		}
		res.status(403).json({
			status: 'fail',
			message: 'Error processing request',
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};
export const declineFriendRequest = async (req, res) => {
	try {
		// Person that sent the request
		const user_id = req.params.id;
		// Person reviewing request
		const currentUser_id = req.body.id;
		const currentUser = await User.findById(currentUser_id);
		// Get user whose request us being reviewed
		if (!currentUser) {
			return res.status(401).json({
				status: 'fail',
				message: 'User does not exist',
			});
		}
		if (
			!currentUser.friends.includes(user_id) &&
			currentUser.requests.includes(user_id)
		) {
			await currentUser.updateOne({ $pull: { requests: user_id } });
			return res.status(201).json({
				status: 'success',
				data: 'Friend request sent',
			});
		}
		res.status(400).json({
			status: 'fail',
			message: 'Failed to decline request',
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

export const getAllFriends = async (req, res) => {
	try {
		const user_id = req.params.id;
		const user = await User.findById(user_id);
		const friends = await User.find({ _id: user.friends });
		res.status(200).json({ status: 'success', data: friends });
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};
