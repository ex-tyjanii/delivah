import express from 'express';
import Home from '../model/Home.js';
import User from '../model/User.js';

export const getAllHomes = async (req, res) => {
	try {
		const homes = await Home.find();
		res.status(200).json({ status: 'success', data: homes });
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

export const createHome = async (req, res) => {
	try {
		const home = await Home.create(req.body);
		res.status(201).json({ status: 'success', data: home });
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

export const updateHome = async (req, res) => {
	try {
		const home = await Home.findByIdAndUpdate(req.params.id, req.body);
		if (!home) {
			res.status(400).json({
				status: 'fail',
				data: 'Home with this id does not exist',
			});
		}
		res.status(200).json({
			status: 'success',
			data: home,
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

export const deleteHome = async (req, res) => {
	try {
		const home = await Home.findByIdAndDelete(req.params.id);
		if (!home) {
			res
				.status(400)
				.json({ status: 'fail', message: 'Home with id does not exist' });
		}
		res.status(204).json({ status: 'success' });
	} catch (err) {
		res.status(400).json({ status: 'fail', message: err });
	}
};
