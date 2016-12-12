
//let ObjectID = require('mongodb').ObjectID;
import { ObjectID } from 'mongodb';
import { result, success } from '../config/messaging';

export function list(req, res, db, collection) {
	db.collection(collection).find().toArray(function(err, result_data) {
		if (err) result_data.error = err;
		if (result_data){
			result.data = result_data;
		}
		res.json(result);
	});
}

export function add(req, res, db, collection){
	db.collection(collection).save(req.body, (err, result_data) => {
		if (err) result_data.error = err;
		if (result_data){
			result.data = result_data.ops;
		}
		res.json(result);
	});
}

export function update(req, res, db, collection){
	req.body._id = ObjectID(req.params.id);
	// To Do find, when not found error
	db.collection(collection).save(req.body, (err) => {
		if (err) result.error = err;

		// To Do find and return
		find_by_id(req, res, db, collection);
	});
}

export function find_by_id(req, res, db, collection){
	db.collection(collection).findOne({'_id': ObjectID(req.params.id)}, (err, result_data) => {
		if (err) result_data.error = err;
		if (result_data){
			result.data = result_data;
		}
		else{
			result.error.push('Nothing found corresponding to your ID');
		}
		res.json(result);
	});
}

export function del(req, res, db, collection){
	// To Do when nothing found throw error
	db.collection(collection).deleteOne({'_id': ObjectID(req.params.id)}, (err, result_data) => {
		if (err) result_data.error = err;
		result.data = success;
		res.json(result);
	});
}