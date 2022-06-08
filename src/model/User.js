import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'First name is required'],
	},
	lastname: {
		type: String,
		required: [true, 'Last name is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: [true, 'Email must be unique'],
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		select: false,
	},
});

userSchema.pre('save', async function (next) {
	// Run function if password was modified
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

userSchema.methods.decryptPassword = async function (
	enteredPassword,
	userPassword
) {
	return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model('users', userSchema);

export default User;
