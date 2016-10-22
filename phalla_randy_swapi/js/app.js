$(document).foundation();

(function() {

	console.log('SEAF');

	// VARIABLES
	var request;
	var loadCharactersButton = document.querySelector('#loadCharacters');
	var results = document.querySelector('#results');
	var characterInfo = document.querySelector('#characterInfo')
	var moviePoster = document.querySelector('.moviePoster');
	var movieTitle = document.querySelector('.movieTitle');
	var episode = document.querySelector('.episode');
	var openingCrawl = document.querySelector('.openingCrawl');
	var director = document.querySelector('.director');
	var producer = document.querySelector('.producer');
	var releaseDate = document.querySelector('.releaseDate');
	var url = 'http://swapi.co/api/people/?format=json';

	// FUNCTIONS

	
	function showResults() {
		request = createRequest();

		if (request == null) {
			alert('Old Browser, Please Update!');
			return;
		}

		request.onreadystatechange = loadCharacters;
		request.open("GET", url, true);
		request.send(null);
	};	
	
	function loadCharacters() {
		if (request.readyState === 4 || request.readyState === "complete") {
			var dataResponse = JSON.parse(request.responseText);
			console.log(dataResponse);
			// console.log(dataResponse.results.length);
			for(var i = 0; i < dataResponse.results.length; i++) {
				
				results.innerHTML += '<a href="'+ dataResponse.results[i].films[0]+'?format=json"><li class="charsList">'+ dataResponse.results[i].name + '</li></a>';
			
			}
			
			var linkItems = results.getElementsByTagName('a');
			// console.log(linkItems);
			for (var i = 0; i < linkItems.length; i++) {
				linkItems[i].addEventListener('click', function(e) {
					e.preventDefault();
					displayInfo(this.getAttribute('href'));
				})
			}
		}	
	};

	function displayInfo(id) {
		console.log("ID: " + id);
		request = createRequest();

		if (request === null) {
			alert('Old Browser, Please Update!');
			return;
		}

		var url = id;
		request.onreadystatechange = displayStatus;
		request.open('GET', url, true);
		request.send(null);
	};

	function displayStatus() {
		if (request.readyState == 4 || request.readyState === "complete") {
			var displayResponse = JSON.parse(request.responseText);
			console.log(displayResponse);
			moviePoster.src = "images/episode-"+ displayResponse.episode_id + ".jpg";
			// console.log(moviePoster);
			movieTitle.innerHTML = "Star Wars " + displayResponse.title;
			episode.innerHTML = "Episode: " + displayResponse.episode_id;
			openingCrawl.innerHTML = "Opening Crawl: " + displayResponse.opening_crawl;
			// director.innerHTML = "Director: " + displayResponse.director;
			// producer.innerHTML = "Producer: " + displayResponse.producer;
			// releaseDate.innerHTML = "Release Date: " + displayResponse.release_date;
		} 
	};

	window.onload = showResults();

	// EVENT LISTENERS

})();