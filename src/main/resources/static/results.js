
let data = JSON.parse(localStorage.getItem("data"));
let searchType = localStorage.getItem("searchType");
localStorage.clear();
let createCardActor = (actor) => {
    let card = document.createElement('div');
    // let image = document.createElement('img');
    let body = document.createElement('div');
    let title = document.createElement('h5');
    // let actorDescription = document.createElement('p');

    // image.srcset = actor.image;
    title.textContent = `${actor.firstName} ${actor.lastName}`;

    card.classList = "card";
    body.classList = "card-body";
    // image.classList = "card-img-top";
    // image.alt = `image of ${actor.firstName} ${actor.lastName}`;
    title.classList = "card-title";
    // actorDescription .classList = "card-text";

    body.appendChild(title);
    // body.appendChild(actorDescription );

    // card.appendChild(image);
    card.appendChild(body);
    card.style = "min-width: 20%";

    container.appendChild(card);
}

let createCardMovie = (movie) => {
    let card = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');
    let id = document.createElement('p');
    // let image = document.createElement('img');
    let body = document.createElement('div');
    let title = document.createElement('h5');
    let releaseText = document.createElement('p');
    let synopsisText = document.createElement('p');
    let castText = document.createElement('p');
    let ratingText = document.createElement('p');
    let runtimeText = document.createElement('p');

    card.id = `id${movie.id}`;
    deleteBtn.style = "position: absolute; z-index: 3; right: 0px"
    deleteBtn.classList = "btn-close";
    editBtn.style = "display: flex; position: absolute; z - index: 3; right: 30px; padding: 0px; margin: 0px; width: 20px; height: 20px; justify - content: center; opacity: 50 %; top: 2px"
    editBtn.style.opacity = "50%"
    editBtn.classList = "btn";
    editImage = document.createElement('img');
    editImage.src = "images/gear.png";
    editImage.style = "width:20px; height:20px"
    editBtn.appendChild(editImage);
    id.style = "position: absolute; z-index: 3; left :3px;";
    id.textContent = movie.id;
    // image.srcset = movie.image;
    title.textContent = movie.title;
    releaseText.textContent = `Release Year: ${movie.release}`;
    runtimeText.textContent = `Approx. Runtime: ${movie.runtime}`;
    let nameArray = [];
    for (let i = 0; i < movie.cast.length; i++) {
        nameArray.push(`${movie.cast[i].firstName} ${movie.cast[i].lastName}`);
    }
    castText.textContent = `Cast: ${nameArray.join()}`;
    synopsisText.textContent = `Synopsis: ${movie.synopsis}`;
    ratingText.textContent = `Rating: ${movie.rating}`;

    card.classList = "card";
    body.classList = "card-body";
    // image.classList = "card-img-top";
    // image.alt = `image of ${movie.title}`;
    title.classList = "card-title";
    releaseText.classList = "card-text";
    synopsisText.classList = "card-text";
    castText.classList = "card-text";
    ratingText.classList = "card-text";
    runtimeText.classList = "card-text";



    deleteBtn.addEventListener('click', (button) => {
        let cardId = button.target.parentElement.id;
        let deleteId = cardId.split('id').join('');
        if (confirm(`Are you sure you would like to remove ${movie.title} from the database?`)) {
            fetch(`http://localhost:8080/movies/delete/${deleteId}`, {
                method: "DELETE",
                headers: {
                    "contentType": "application/JSON"
                }
            }).then((response) => {
                if (response.status != 204) {
                    console.error(response.message);
                } else {
                    container.removeChild(document.querySelector(`#${cardId}`));
                }
            })
        }
    })

    body.appendChild(title);
    body.appendChild(releaseText);
    body.appendChild(runtimeText);
    body.appendChild(castText);
    body.appendChild(synopsisText);
    body.appendChild(ratingText);

    card.appendChild(deleteBtn);
    card.appendChild(editBtn);
    card.appendChild(id);
    // card.appendChild(image);
    card.appendChild(body);
    card.style = "min-width: 300px";

    container.appendChild(card);
}
if (data.length > 0) {
    if (searchType == "actor") {
        for (actor of data) {
            createCardActor(actor)
        }

    } else {
        for (movie of data) {
            createCardMovie(movie)
        }
    }
} else {
    console.log("no results");
}