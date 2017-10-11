var request = require('request');
var fs = require('fs');
var twitter = require ('twitter');
var spotify = require('node-spotify-api');
var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys; 
var spotify = new spotify(spotifyKeys);
var client = new twitter(twitterKeys);
var command = process.argv[2];

switch (command) {

  case "my-tweets":
    var params = {screen_name: 'fakecela'};
  	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	  if (!error) {
  	    for (var i = 0; i < tweets.length; i++) {
  	    	console.log(tweets[i].text);
  	    	console.log(tweets[i].created_at);
  	    };
  	  };
  	});
  break;

  case "spotify-this-song":
  	var song = "";
  	var nodeArgs = process.argv;
  	for (var i = 3; i < nodeArgs.length; i++) {
  		if (i > 3 && i < nodeArgs.length) {
  			song = song + "+" + nodeArgs[i];
  		} else {
  			song += nodeArgs[i]
  		}
  	};

  	if (process.argv[3] === undefined) {
  		song = "the+sign+ace";
  	}

  	spotify.search({ type: 'track', query: song }, function(err, data) {
  		if (err) {
		    return console.log('Error occurred: ' + err);
	  } 
  		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
  		console.log("Song: " + data.tracks.items[0].name);
  		console.log("Link: " + data.tracks.items[0].external_urls.spotify); 
  		console.log("Album: " + data.tracks.items[0].album.name);   
		});
  break;

  case "movie-this":
  	var movie = "mr.nobody";
  	var nodeArgs = process.argv;
  	for (var i = 3; i < nodeArgs.length; i++) {
  		if (i > 3 && i < nodeArgs.length) {
  			movie = "";
  			movie = movie + "+" + nodeArgs[i];
  		} 

  		else {
  			movie += nodeArgs[i]
  		}
  	};

  	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
    request(queryURL, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		};
	 });		
  break;

  case "do-what-it-says":

   fs.readFile('random.txt', 'utf8', function(err, data) {
    var split = data.split(',');
    var newCommand = split[0];
    var newVariable = split[1];

        spotify.search({ type: 'track', query: newVariable }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          } 
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].external_urls.spotify); 
        console.log("Album: " + data.tracks.items[0].album.name);   
          });

      });
  break;

};