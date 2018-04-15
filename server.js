//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');

//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;

//mongo db connect 
const dbURI =  'mongodb://localhost/todo';
mongoose.connect(dbURI);

mongoose.connection.once('connected', () => {
    console.log(`MongoDB connection connection opened to: ${dbURI} - ${new Date()}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
});

mongoose.connection.once('disconnected', () => {
    console.log('MongoDB disconnected');
});

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.route('/comments')
 //retrieve all comments from the database
    .get(function(req, res) {
        //looks at our Comment Schema
        Comment.find(function(err, comments) {
            if (err)
            res.send(err);
            //responds with a json object of our database comments.
            res.json(comments)
        });
    })
    //post new comment to the database
    .post(function(req, res) {
    var comment = new Comment();
    //body parser lets us use the req.body
    comment.name = req.body.name;
    comment.tasklist = req.body.tasklist;
    comment.save(function(err) {
        if (err)
        res.send(err);
        res.json({ message: 'Comment successfully added!' });
    });
});


//Adding a route to a specific comment based on the database ID
router.route('/comments/:comment_id')
 .put(function(req, res) {
	Comment.findById(req.params.comment_id, function(err, comment) {
	 if (err)
	 res.send(err);
	//setting the new author and text to whatever was changed. If 
	//nothing was changed we will not alter the field.
	
	(req.body.tasklist) ? comment.tasklist = req.body.tasklist : null;
		//save comment
		comment.save(function(err) {
		 if (err)
		 res.send(err);
			res.json({ message: 'Comment has been updated' });
		});
	});
 })
 //delete method for removing a comment from our database
 .delete(function(req, res) {
	 //selects the comment by its ID, then removes it.
	 Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
		 if (err)
		 res.send(err);
		 res.json({ message: 'Comment has been deleted' })
	 })
 });

//Use our router configuration when we call /api
app.use('/todo', router);
//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});