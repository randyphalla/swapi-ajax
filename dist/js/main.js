(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
    console.log("SWAPI API INIT");

    const uri = 'https://swapi.co/api/';
    const formatJSON = '/?format=json';

    const results = document.querySelector('#results');
    const characterImage = document.querySelector('.character-image');
    const characterName = document.querySelector('.character-name');
    const birthYear = document.querySelector('.birth-year');;
    const eyeColor = document.querySelector('.eye-color');
    const gender = document.querySelector('.gender');
    const hairColor = document.querySelector('.hair-color');
    const height = document.querySelector('.height');
    const mass = document.querySelector('.mass');
    const skinColor = document.querySelector('.skin-color');

    function getCharacters() {

        fetch(uri + 'people' + formatJSON)
            .then(function(res) {

                if (res) {
                    console.log("Success");
                } else {
                    console.log("Error");
                }

                res.json().then(function(data) {

                    const characterResults = data.results;
                    
                    for(var i = 0; i < characterResults.length; i++) {
                        results.innerHTML += '<li class="character-item"><a href="'+  characterResults[i].url +'" >' + characterResults[i].name + "<br><span>" + characterResults[i].gender + '</span></a></li>';
                    }

                    const linkItems = document.getElementsByTagName('a');
                    for (var i = 0; i < linkItems.length; i++) {
                        linkItems[i].addEventListener('click', function(e) {
                            e.preventDefault();
                            getCharacterInfo(this.getAttribute('href'));
                        })
                    }

                });

            })
            .catch(function(err) {
                console.log('Error', err);
            })

    }

    function getCharacterInfo(id) {
        fetch(id)
            .then(function(res) {

                if (res) {
                    console.log('Success');
                } else {
                    console.log('Error');
                }
                
                res.json().then(function(data) {
                    // characterImage.innerHTML = data.name;
                    characterName.innerHTML = "Name: " + data.name;   
                    birthYear.innerHTML = "Birth year: " + data.birth_year;   
                    eyeColor.innerHTML = "Eye color: " + data.eye_color;   
                    gender.innerHTML = "Gender: " + data.gender;   
                    hairColor.innerHTML = "Hair Color: " + data.hair_color;   
                    height.innerHTML = "Height: " + data.height;   
                    mass.innerHTML = "Mass: " + data.mass;   
                    skinColor.innerHTML = "Skin Color: " + data.skin_color;            
                })
                .catch(function(err) {
                    console.log(err);
                })

            })
            .catch(function(err) {
                console.log('Error', err);
            })

    }

    getCharacters(); // Load Characters

})();
},{}]},{},[1])