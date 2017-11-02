var path = require("path");
var friends = require('../data/friends.js');

module.exports = function(app) {
	
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req,res) {

		var friendData = req.body;
		var friendScores = friendData.scores;

		var scores = [];
		var friendChoices = 0;
		var match = 0;

		for (var x = 0; x < friends.length; x++) {
			var difference = 0;
			for (var i = 0; i < friendScores.length; i++) {
				difference += (Math.abs(parseInt(friends[x].scores[i]) - parseInt(friendScores[i])));
			}
			
			scores.push(difference);

		}

		for (var y = 0; y < scores.length; y++) {
			if (scores[y] <= scores[match]) {
				match = y;
			}
		}

		var matchedFriend = friends[match];

		res.json(matchedFriend);

		friends.push(req.body);

	});

};