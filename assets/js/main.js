// console.log("SWAPI API INIT");

const uri = 'https://swapi.co/api/';
const formatJSON = '/?format=json';

const characters = '';
const characterName = 'Character Name';
const birthYear = 'Birth Year';

function getCharacters() {
    // console.log('Get Characters');

    fetch(uri + 'people' + formatJSON)
        .then(function(res) {

            if (res) {
                console.log("Success: ", res);
            } else {
                console.log("Error");
            }

            // console.log(res.json());
            res.json().then(function(data) {
                // console.log(data.results);
                const characterResults = data.results;
                // console.log('Characters: ', characterResults);

                characterResults.forEach(function(res) {
                    // console.log("FOR EACH", res.name);
                    
                    // WORKS

                    

                });

                // for(var i = 0; i < characterResults.length; i++) {
                //     console.log("FOR LOOP: ", characterResults[i]);
                //     console.log("FOR LOOP: ", characterResults.length);
                // }
            });
        })
        .catch(function(err) {
            console.log('Error', err);
        })

}

function getCharacterInfo(id) {
    console.log('Get Character', id);
}

getCharacters(); // Load Characters

// getCharacterInfo();