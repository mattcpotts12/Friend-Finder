
var friends = require('../data/friends.js');


module.exports = function(app){

	app.get('/api/survey', function(req, res){
		res.json(friends);
	});

	app.post('/api/friends', function (req, res) {
		
		var newFriend = {
			name: req.body.name,
			photo: req.body.photo,
			scores: []
		};

		var scoresArr = [];
		for(var i=0; i < req.body.scores.length; i++){
			scoresArr.push( parseInt(req.body.scores[i]) )
		}
		newFriend.scores = scoresArr;
	
	
		//variable to compaire scores
		var scoreCompare = [];

		for(var i=0; i < friends.length; i++){
			var currentComparison = 0;
			for(var j=0; j < newFriend.scores.length; j++){
				currentComparison += Math.abs( newFriend.scores[j] - friends[i].scores[j] );
			}
			scoreCompare.push(currentComparison);
		}
	
		
		var bestMatchPosition = 0; 
		for(var i=1; i < scoreCompare.length; i++){
			// Lower number in comparison difference means better match
			if(scoreCompare[i] <= scoreCompare[bestMatchPosition]){
			bestMatchPosition = i;
			}
		}

		var bestFriendMatch = friends[bestMatchPosition];

		res.json(bestFriendMatch);

		friends.push(newFriend);
	  });
	}

