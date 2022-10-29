(function () {
  // const uri = 'https://swapi.co/api/';
  const uri = 'https://swapi.dev/api/';
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
      .then(function (res) {
        if (res) {
          res.json().then(function (data) {
            const characterResults = data.results;
            for (var i = 0; i < characterResults.length; i++) {
              results.innerHTML += '<li class="character-item"> <a href="' + characterResults[i].url + '">' + "<img class='avatar' src='./assets/images/" + characterResults[i].name + ".png' /> <div class='character-info'>" + characterResults[i].name + "<br> <span>" + characterResults[i].gender + '</span> </div> </a> </li>';
            }
            const linkItems = document.getElementsByTagName('a');
            for (var i = 0; i < linkItems.length; i++) {
              linkItems[i].addEventListener('click', function (e) {
                e.preventDefault();
                getCharacterInfo(this.getAttribute('href'));
              });
            }
          });
        } else {
          console.error('Get res failed!');
        }
      })
      .catch(function (err) {
        console.error('Fetch characters failed', err);
      });
  }

  function getCharacterInfo(id) {
    fetch(id)
      .then(function (res) {
        if (res) {
          res.json().then(function (data) {
            characterImage.innerHTML = "<img src='./assets/images/" + data.name + ".png'/>";
            characterName.innerHTML = "Name: " + data.name;
            birthYear.innerHTML = "Birth year: " + data.birth_year;
            eyeColor.innerHTML = "Eye color: " + data.eye_color;
            gender.innerHTML = "Gender: " + data.gender;
            hairColor.innerHTML = "Hair Color: " + data.hair_color;
            height.innerHTML = "Height: " + data.height;
            mass.innerHTML = "Mass: " + data.mass;
            skinColor.innerHTML = "Skin Color: " + data.skin_color;
          })
          .catch(function (err) {
            console.error(`Fetch character data failed! ${err}`);
          })
        } else {
          console.error('Fetch res failed!');
        }
      })
      .catch(function (err) {
        console.error(`Fetch character ${err}`);
      });
  }

  getCharacters();
})();
