/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
/*eslint global-require: "error"*/
/*eslint-env node*/

import express from 'express';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';
//import path from 'path';

let app = express();
let db = require('../etc/database-connections.json').connections.local;


import { list, add, update, find_by_id, del } from './modules/model';

const linkCollection = 'links';

const MongoClient = mongodb.MongoClient;
MongoClient.connect('mongodb://'+db.host+':'+db.port+'/'+db.database+'', (err, database) => {
	if(err){
		console.error('Mongo: ', err);
	}else{
		let db = database;
		console.warn('Mongo connection is made');

    // Get access to post / put body when needed
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

    // Allow cors access
		app.use(function(req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			next();
		});

    /* Links API */
  // List all links
		app.get('/links', (req, res) => {
      // var cursor = db.collection('quotes').find();
			list(req, res, db, linkCollection);
		});

    // Add a new link
		app.post('/links', (req, res) => {
			add(req, res, db, linkCollection);
		});

    // Update a link
		app.put('/links/:id', (req, res) => {
			update(req, res, db, linkCollection);
		});

    // Delete a link
		app.delete('/links/:id', (req, res) => {
			del(req, res, db, linkCollection);
		});

    // Find a link by id
		app.get('/links/:id', (req, res) => {
			find_by_id(req, res, db, linkCollection);
		});

		app.all('*', function (req, res, next) {
			res.json('{"status": "404","title": "Not found!"}');
			next();
		});



    // app.use(function(req,res) { 
    //   res.render('404', { 
    //     locals: {'title':'Not Found'}, }, 
    //       function(err,str) { res.send(str,404); } 
    //   );
    // });


    // Start mongo connection then server


    // Now the connection is active start the server
		app.listen(3000, function () {
			console.warn('Example app listening on port 3000 forwarded to 80 in live environment!');
		});
	}
});

