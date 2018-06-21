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
                    console.log("Success: ");
                } else {
                    console.log("Error");
                }

                res.json().then(function(data) {

                    const characterResults = data.results;
                    
                    for(var i = 0; i < characterResults.length; i++) {
                        results.innerHTML += '<li class="character-item"><a href="'+  characterResults[i].url +'" >' + characterResults[i].name + '</a></li>';
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
                console.log(res);

                if (res) {
                    console.log('Success');
                } else {
                    console.log('Error');
                }
                
                res.json().then(function(data) {
                    console.log(data);        
                    // characterImage.innerHTML = data.name;
                    characterName.innerHTML = data.name;   
                    birthYear.innerHTML = data.birth_year;   
                    eyeColor.innerHTML = data.eye_color;   
                    gender.innerHTML = data.gender;   
                    hairColor.innerHTML = data.hair_color;   
                    height.innerHTML = data.height;   
                    mass.innerHTML = data.mass;   
                    skinColor.innerHTML = data.skin_color;            
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