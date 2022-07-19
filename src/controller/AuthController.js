import jwt from 'jsonwebtoken';
import User from '../model/User.js';

const createToken = (user, responseCode, req, res) => {
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES,
	});
	res.cookie('jwt', token, {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
	});
	user.password = undefined;
	res.status(responseCode).json({
		status: 'success',
		token,
		data: user,
	});
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if ((!email, !password)) {
			return res.status(400).json({
				status: 'fail',
				message: 'Please enter username and password',
			});
		}
		const user = await User.findOne({ email }).select('+password');

		if (!user || !(await user.decryptPassword(password, user.password))) {
			return res
				.status(400)
				.json({ status: 'fail', message: 'Incorrect email or password ' });
		}
		console.log(user);
		createToken(user, 200, req, res);
	} catch (err) {
		res.status(400).json({ status: 'fail', message: err });
	}
};

const signup = async (req, res) => {
	try {
		const { firstname, lastname, email, password, role } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			return res
				.status(401)
				.json({ status: 'fail', message: 'User already exists, please login' });
		}
		const newUser = await User.create({
			firstname,
			lastname,
			email,
			password,
			role,
		});
		createToken(newUser, 201, req, res);
	} catch (err) {
		res.status(400).json({ status: 'fail', message: err });
	}
};

export { login, signup };
