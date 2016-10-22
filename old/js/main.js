// JavaScript Document

(function() {


// First AJAX CALL - GET LIST OF CHARACTERS
var request;
// Click on button to show list of characters
var button = document.querySelector('#showResults');
// Hide Content
document.querySelector(".secondContent").style.visibility = 'hidden';

// Function to show List of Chracters
function showResults() {

	request = new XMLHttpRequest();
	// console.log('test');
		
	if(request === null) {
		alert("Old Browser: Please Update");
		return;
	}

	var url = "http://swapi.co/api/people/?format=json";
	// var url = "http://swapi.co/api/people/?format=json&page=2";
	// console.log(url);
	request.onreadystatechange = stateChangedJSON;
	request.open("GET", url, true);
	request.send(null);

} // end showResults


function stateChangedJSON() {

	if (request.readyState === 4 || request.readyState === "complete") {
		var data = JSON.parse(request.responseText);
		// console.log(data.results);
		// console.log(data.results.length);
		for (var i = 0; i < data.results.length; i++) {
			console.log(data.results[i].films[0]); 			
 			document.querySelector(".result").innerHTML += '<p class="resultInfo text-center"><a href="'+   data.results[i].films[0] + '?format=json">' + data.results[i].name +' </a></p>';
		}
 		
 		// Prevents link from clicking on the site
 		var links = document.querySelector('.result').getElementsByTagName('a');
		for(var i = 0; i < links.length; i++){
 			links[i].addEventListener('click', function(e){
	 			e.preventDefault();
	 			displayInfo(this.getAttribute('href'));
	 			console.log(this.getAttribute('href'));
 			})
 		}
	}
} // end stateChangedJSON



// EVENT LISTENER
button.addEventListener("click", function(e) {
	e.preventDefault();
	showResults(this.value);
	// console.log("button works");
	// Content Change
	this.innerHTML = "Welcome to the Dark Side";
	this.style.background = "#242424";
	this.style.color = "#E74C3C";
}, false);

}());

// Second AJAX Call

// Display User's Information
function displayInfo(id) {
	console.log('the url passed in is ' + id);
	var displayRequest = new XMLHttpRequest();

		if(displayRequest === null) {
			alert("Broken");
			return;
		}

	var url2 = id;
	displayRequest.onreadystatechange = displayStatus;
	displayRequest.open("GET", url2, true);
	displayRequest.send(null);
	
	function displayStatus() {
		if (displayRequest.readyState === 4 || displayRequest.readyState === "complete") {
			var dataInfo = JSON.parse(displayRequest.responseText);

			console.log('i am in display status');
			// Show Content
			document.querySelector(".secondContent").style.visibility = 'visible';
			
			// Movie Information
			document.querySelector(".displayResult").innerHTML = 
				'<p> Title: ' + dataInfo.title + '</p>' + 
				'<p> Episode: ' + dataInfo.episode_id  + '</p>' +
				'<p> Description: ' + dataInfo.opening_crawl  + '</p>' +
				'<p> Director: ' + dataInfo.director  + '</p>' +
				'<p> Producer: ' + dataInfo.producer  + '</p>' +
				'<p> Release Date: ' + dataInfo.release_date  + '</p>';
		}
	}

}