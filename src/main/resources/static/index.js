'use strict'

let random = document.querySelector('#randomBtn');
let container = document.querySelector('#randomSpace');

let movie;

let pickRandom = (movieList) => {
    let num = Math.floor(Math.random() * movieList.length);
    console.log(num);
    return movieList[num];
}



let createCard = (movie) => {
    let card = document.createElement('div');
    let image = document.createElement('img');
    let body = document.createElement('div');
    let title = document.createElement('h5');
    let releaseText = document.createElement('p');
    let synopsisText = document.createElement('p');
    let castText = document.createElement('p');
    let ratingText = document.createElement('p');
    let runtimeText = document.createElement('p');

    let newUrl;
    if (movie.imageUrl != null) {
        console.log("not null")
        newUrl = movie.imageUrl.replace(/\\/g, "/");
    } else {
        newUrl = "images/empty.png";
    }
    image.src = newUrl;
    title.textContent = movie.title;
    releaseText.textContent = `Release Year: ${movie.year}`;
    runtimeText.textContent = `Approx. Runtime: ${movie.runtime} minutes`;
    let nameArray = [];
    for (let i = 0; i < movie.cast.length; i++) {
        nameArray.push(` ${movie.cast[i].firstName} ${movie.cast[i].lastName}`);
    }
    castText.textContent = `Cast: ${nameArray.join()}`;
    synopsisText.textContent = `Synopsis: ${movie.synopsis}`;
    ratingText.textContent = `Rating: ${movie.rating}`;

    card.classList = "card";
    body.classList = "card-body";
    image.classList = "card-img-top";
    image.alt = `image of ${movie.title}`;
    title.classList = "card-title";
    releaseText.classList = "card-text";
    synopsisText.classList = "card-text";
    castText.classList = "card-text";
    ratingText.classList = "card-text";
    runtimeText.classList = "card-text";

    body.appendChild(title);
    body.appendChild(releaseText);
    body.appendChild(runtimeText);
    body.appendChild(castText);
    body.appendChild(synopsisText);
    body.appendChild(ratingText);

    card.appendChild(image);
    card.appendChild(body);

    container.appendChild(card);
}

let getAll = () => {
    fetch(`http://localhost:8080/movies/get`).then((response) => {
        if (response.status != 200) {
            console.error(response);
        } else if (response.status == 404) {
            let message = document.createElement('p');
            message.textContent = "There are no movies in the database, please create some using the new dropdown menu above.";
            message.appendChild(message);
        }
        else {
            response.json().then((data) => {
                let movieList = [];
                console.log(data);
                for (let obj of data) {
                    console.log(obj);
                    movieList.push(obj);
                }
                console.log(movieList);
                console.log(pickRandom(movieList));
                console.log(container.querySelector('*'));
                if (container.querySelector('.card')) {
                    container.removeChild(container.querySelector('.card'));
                }
                createCard(pickRandom(movieList))

            })
        }
    })
}



random.addEventListener('click', getAll);