import mongooose from 'mongoose';

const db = () => {
	return mongooose.connect(process.env.MONGO_URI);
};
export default db;
