$(document).foundation();

(function() {

	console.log('SEAF');

	// VARIABLES
	var request;
	var loadCharactersButton = document.querySelector('#loadCharacters');
	var resultsCont = document.querySelector('.resultsCont');
	var results = document.querySelector('#results');
	var characterInfo = document.querySelector('#characterInfo');
	// var moviePoster = document.querySelector('.moviePoster');
	var movieTitle = document.querySelector('.movieTitle');
	var episode = document.querySelector('.episode');
	var openingCrawl = document.querySelector('.openingCrawl');
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
				// results.innerHTML += '<a href="'+ dataResponse.results[i].films[0]+'?format=json"><img src="images/'+dataResponse.results[i].name+'.png"><p>'+ dataResponse.results[i].name + '</p></a>';
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
			// moviePoster.src = "images/episode-"+ displayResponse.episode_id + ".jpg";
			// moviePoster.style.backgroundImage = 'url("./images/episode-'+ displayResponse.episode_id+'.jpg")';
			characterInfo.style.backgroundImage = 'url("./images/episode-'+displayResponse.episode_id+'.jpg")';
			// console.log(moviePoster);
			movieTitle.innerHTML = displayResponse.title;
			episode.innerHTML = "Episode: " + displayResponse.episode_id;
			openingCrawl.innerHTML = displayResponse.opening_crawl;
			characterInfo.classList.remove('hidden');
		} 
	};

	// window.onload = showResults();

	// EVENT LISTENERS
	loadCharactersButton.addEventListener("click", function(e) {
		showResults();
		loadCharactersButton.innerHTML = 'WELCOME JEDI!';
		loadCharactersButton.classList.add('fade-out');
	}, false);


	// Close Details Page



})();