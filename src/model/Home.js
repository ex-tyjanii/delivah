import mongoose from 'mongoose';

const HomeSchema = mongoose.Schema({
	address: { type: String, required: [true, 'Address is required'] },
	city: { type: String, required: [true, 'City is required'] },
	state: { type: String, required: [true, 'State is required'] },
	zip: { type: String, required: [true, 'ZIP is required'] },
	number_of_rooms: Number,
	number_of_baths: Number,
	billsIncluded: Boolean,
	desc: { type: String, required: [true, 'Decription is required'] },
	poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Home = mongoose.model('Home', HomeSchema);

export default Home;
