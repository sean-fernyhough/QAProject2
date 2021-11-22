


let data = JSON.parse(localStorage.getItem("data"));
let searchType = localStorage.getItem("searchType");
localStorage.clear();

let page = document.querySelector('body');

let createCardActor = (actor) => {
    let card = document.createElement('div');
    let body = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');
    let id = document.createElement('p');
    let title = document.createElement('h5');

    title.textContent = `${actor.firstName} ${actor.lastName}`;

    card.classList = "card";
    body.classList = "card-body";
    title.classList = "card-title";

    body.appendChild(title);

    card.appendChild(body);
    card.style = "min-width: 20%";



    card.id = `id${actor.id}`;
    deleteBtn.style = "position: absolute; z-index: 3; right: 0px"
    deleteBtn.classList = "btn-close";
    editBtn.style = "display: flex; position: absolute; z - index: 3; right: 30px; padding: 0px; margin: 0px; width: 20px; height: 20px; justify - content: center; opacity: 50 %; top: 2px"
    editBtn.style.opacity = "50%"
    editBtn.classList = "btn";
    let editImage = document.createElement('img');
    editImage.src = "images/gear.png";
    editImage.style = "width:20px; height:20px"
    editBtn.appendChild(editImage);
    id.style = "position: absolute; z-index: 3; left :3px;";
    id.textContent = actor.id;

    deleteBtn.addEventListener('click', (button) => {
        let cardId = button.target.parentElement.id;
        let deleteId = cardId.split('id').join('');
        if (confirm(`Are you sure you would like to remove ${actor.firstName} ${actor.lastName} from the database?`)) {
            fetch(`http://localhost:8080/actors/delete/${deleteId}`, {
                method: "DELETE",
                headers: {
                    "contentType": "application/JSON"
                }
            }).then((response) => {
                if (response.status == 500) {
                    alert("please remove this actor from any existing movies first");
                } if (response.status != 204) {
                    console.error(response.statusText);
                } else {
                    container.removeChild(document.querySelector(`#${cardId}`));
                }
            })
        }
    })

    editBtn.addEventListener('click', (button) => {
        let cardId = button.target.parentElement.parentElement.id;
        let editId = cardId.split('id').join('');
        fetch(`http://localhost:8080/actors/get/id/${editId}`).then((response) => {
            if (response.status != 200) {
                console.error(response)
            } else {
                response.json().then((data) => {

                    let main = document.createElement('div');
                    main.classList = "d-grid justify-content-center align-items-center align-self-center"
                    main.id = "actorMenu";
                    let overlay = document.createElement('div');
                    overlay.id = "overlay";


                    let fNameText = document.createElement('p');
                    fNameText.textContent = "First Name:"
                    let fNameInput = document.createElement('input');
                    fNameInput.value = data.firstName;

                    let lNameText = document.createElement('p');
                    lNameText.textContent = "Last Name:"
                    let lNameInput = document.createElement('input');
                    lNameInput.value = data.lastName;

                    let closeBtn = document.createElement('button');
                    closeBtn.style = "position: absolute; top: 20px; right:20px";
                    closeBtn.classList = "btn-close";

                    let submitBtn = document.createElement('button');
                    submitBtn.textContent = "Update";
                    submitBtn.classList = "btn btn-outline-success";
                    submitBtn.type = "button";
                    submitBtn.addEventListener('click', () => {
                        if (fNameInput.value == "" || lNameInput.value == "") {
                            nameError();
                            console.error("name required");
                        } else {
                            console.log(overlay);
                            let newActor = {
                                "firstName": fNameInput.value,
                                "lastName": lNameInput.value,
                            }
                            page.removeChild(document.querySelector('#actorMenu'));
                            page.removeChild(document.querySelector('#overlay'));
                            fetch(`http://localhost:8080/actors/update/${editId}`, {
                                method: "PUT",
                                headers: {
                                    "content-Type": "application/JSON"
                                },
                                body: JSON.stringify(newActor)
                            }).then((response) => {
                                if (response.status != 202) {
                                    console.error(response);
                                } else {
                                    response.json().then((data) => {
                                        console.log(data);
                                        ActorUpdated()

                                    })
                                }
                            })
                        }
                    });


                    overlay.addEventListener('click', () => {
                        page.removeChild(document.querySelector('#actorMenu'));
                        page.removeChild(document.querySelector('#overlay'));
                    })

                    closeBtn.addEventListener('click', () => {
                        page.removeChild(document.querySelector('#actorMenu'));
                        page.removeChild(document.querySelector('#overlay'));
                    })

                    main.appendChild(fNameText);
                    main.appendChild(fNameInput);
                    main.appendChild(lNameText);
                    main.appendChild(lNameInput);
                    main.appendChild(submitBtn);
                    page.appendChild(overlay);
                    main.appendChild(closeBtn);
                    page.appendChild(main);
                })
            }
        })
    });



    card.appendChild(deleteBtn);
    card.appendChild(editBtn);
    card.appendChild(id);
    card.appendChild(body);
    card.style = "min-width: 300px";

    container.appendChild(card);

}


let createCardMovie = (movie) => {
    let card = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');
    let id = document.createElement('p');
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
        newUrl = movie.imageUrl.replace(/\\/g, "/");
    } else {
        newUrl = "images/empty.png";
    }
    image.src = newUrl;
    title.textContent = movie.title;
    releaseText.textContent = `Release Year: ${movie.year}`;
    runtimeText.textContent = `Approx. Runtime: ${movie.runtime} minutes`;

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

    let nameArray = [];
    for (let i = 0; i < movie.cast.length; i++) {
        nameArray.push(`${movie.cast[i].firstName} ${movie.cast[i].lastName}`);
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

    editBtn.addEventListener('click', (button) => {
        console.log(button);
        let cardId = button.target.parentElement.parentElement.id;
        console.log(cardId);
        let editId = cardId.split('id').join('');
        console.log(editId);

        fetch(`http://localhost:8080/movies/get/${editId}`).then((response) => {
            if (response.status != 200) {
                console.error(response.message);
            } else {
                response.json().then((data) => {
                    console.log(response);
                    console.log(data);
                    console.log(data.cast)
                    let oldTitle = data.title;
                    let oldRuntime = data.runtime;
                    let oldSynopsis = data.synopsis;
                    let oldRating = data.rating;
                    let oldYear = data.year;

                    let oldCast = data.cast;

                    let main = document.createElement('div');
                    main.classList = "d-grid justify-content-center align-items-center align-self-center"
                    // main.style = "overflow: auto; background-color: white; position: fixed; z-index: 10; min-width: 40%; max-width: 97%; min-height: 40%; max-height: 90%; border-radius: 50px; padding: 20px; margin: 0px 30px 0px 30px; top:10%; bottom:10%"
                    main.id = "movieMenu";

                    let overlay = document.createElement('div');
                    overlay.id = "overlay";
                    overlay.style = "position: fixed; z-index: 5; min-height: 100%; min-width: 100%; background-color: rgba(0, 0, 0, 0.50);";
                    overlay.addEventListener('click', () => {
                        page.removeChild(document.querySelector('#movieMenu'));
                        page.removeChild(document.querySelector('#overlay'));
                    })


                    fetch('http://localhost:8080/actors/get').then((response) => {
                        if (response.status != 200 && response.status != 404) {
                            console.error(`Error: ${response.status}: ${response.message}`);
                        } else if (response.status == 404) {
                            console.log(response.message);
                        } else {
                            response.json().then((cast) => {
                                console.log(cast)
                                cast.sort()

                                let closeBtn = document.createElement('button');
                                closeBtn.classList = "btn-close";
                                closeBtn.style = "position: absolute; right: 20px; top : 20px"


                                let titleText = document.createElement('p');
                                titleText.textContent = "Title:"
                                let title = document.createElement('input');
                                title.type = "text";
                                title.value = `${oldTitle}`;

                                let imageText = document.createElement('p');
                                imageText.textContent = "Select an image:";
                                let imageBtn = document.createElement('input');
                                imageBtn.type = "file";

                                let yearText = document.createElement('p');
                                let runText = document.createElement('p');
                                let yearRunText = document.createElement('div');
                                yearText.textContent = "Release Year:";
                                runText.textContent = "Approx. Runtime:"
                                yearRunText.style = "display: inline-flex; justify-content: space-between"
                                let year = document.createElement('input');
                                year.style = "width: 100px";
                                year.type = "number";
                                year.value = `${oldYear}`;
                                let run = document.createElement('input');
                                run.style = "width: 100px";
                                run.type = "number";
                                run.value = `${oldRuntime}`;
                                let yearRun = document.createElement('div');
                                yearRun.style = "display: inline-flex; justify-content: space-around"
                                let castText = document.createElement('p');
                                castText.textContent = "Cast:";
                                let castDisplay = document.createElement('div')
                                castDisplay.id = "castDisplay"
                                castDisplay.style = "min-width: 250px; min-height: 40px; border-radius: 10px; border-style: solid; border-width: 1px";
                                // ---------------------------------------
                                let actorRemoveBtn
                                for (oldActor of oldCast) {
                                    let addedOldActor = document.createElement('div');
                                    addedOldActor.style = "display:flex; justify-content: space-between; background-color: off-white; border-style: solid; border-width:0.5px; border-radius: 10px; padding: 5px; margin: 3px"
                                    let addedOldActorName = document.createElement('p');
                                    addedOldActorName.textContent = `${oldActor.firstName} ${oldActor.lastName}`;
                                    addedOldActorName.style = "display:inline; margin: 0px 10px 0px 0px;"
                                    actorRemoveBtn = document.createElement('button');
                                    actorRemoveBtn.type = "button";
                                    actorRemoveBtn.classList = "btn-close";
                                    addedOldActor.appendChild(addedOldActorName);
                                    addedOldActor.appendChild(actorRemoveBtn);
                                    castDisplay.appendChild(addedOldActor);
                                    actorRemoveBtn.addEventListener('click', (obj) => {
                                        let parent = obj.target.parentElement;
                                        castDisplay.removeChild(parent);
                                    })
                                }
                                // -----------------------------------
                                let castDropDown = document.createElement('select');
                                castDropDown.classList = "form-select";
                                let defaultCast = document.createElement('option')
                                defaultCast.textContent = "Select an actor";
                                defaultCast.selected = true;
                                castDropDown.appendChild(defaultCast);
                                for (let actor of cast) {
                                    let curActor = document.createElement('option');
                                    curActor.textContent = `${actor.firstName} ${actor.lastName}`;
                                    curActor.value = `${actor.firstName} ${actor.lastName}`;
                                    castDropDown.appendChild(curActor);
                                } castDropDown.addEventListener('change', (click) => {
                                    let name = click.target.value;
                                    defaultCast.selected = true;
                                    console.log(name);
                                    let addedActor = document.createElement('div');
                                    addedActor.style = "display:flex; justify-content: space-between; background-color: off-white; border-style: solid; border-width:0.5px; border-radius: 10px; padding: 5px; margin: 3px"
                                    let addedActorName = document.createElement('p');
                                    addedActorName.textContent = name;
                                    addedActorName.style = "display:inline; margin: 0px 10px 0px 0px;"
                                    let actorRemoveBtn = document.createElement('button');
                                    actorRemoveBtn.addEventListener('click', (obj) => {
                                        let parent = obj.target.parentElement;
                                        castDisplay.removeChild(parent);
                                    })
                                    actorRemoveBtn.type = "button";
                                    actorRemoveBtn.classList = "btn-close";
                                    addedActor.appendChild(addedActorName);
                                    addedActor.appendChild(actorRemoveBtn);
                                    castDisplay.appendChild(addedActor);
                                })

                                let actorSearch = document.createElement('input');
                                actorSearch.placeholder = "Or search for an actor here";
                                actorSearch.addEventListener('input', (input) => {
                                    if (main.querySelector('#actorList')) {
                                        main.removeChild(main.querySelector('#actorList'));
                                    }
                                    let value = input.target.value;
                                    console.log(value)
                                    if (value != "") {
                                        fetch(`http://localhost:8080/actors/get/${value}`).then((response) => {
                                            if (response.status != 200 && response.status != 404) {
                                                console.error(response);
                                            } else if (response.status == 404) {
                                                console.warn(`no actors found with name: ${value}`);
                                            } else {
                                                response.json().then((data) => {
                                                    if (data.length > 0) {
                                                        let actorList = document.createElement('div');
                                                        for (let actor of data) {
                                                            console.log(`${actor.firstName} ${actor.lastName}`);
                                                            let actorItem = document.createElement('div');
                                                            actorItem.style = `background-color: white; margin: 0px;`;
                                                            let actorName = document.createElement('p');
                                                            actorName.style = `margin: 0px; padding: 0px 0px 0px 5px `;
                                                            actorName.textContent = `${actor.firstName} ${actor.lastName}`;
                                                            actorItem.appendChild(actorName);
                                                            actorList.appendChild(actorItem);
                                                            actorList.style = `overflow:auto;position: absolute; z-index: 15; justify-self: center;top: 305px;min-width:250px;max-height:300px; background-color: white; border-style: solid; border-width: 1px; padding: 3px 0px; border-radius: 3px;`;

                                                            actorList.id = "actorList";
                                                            actorSearch.insertAdjacentElement("afterend", actorList);

                                                            actorItem.addEventListener('mouseout', () => {
                                                                actorItem.style = "background-color: white"
                                                            })

                                                            actorItem.addEventListener('mouseover', () => {
                                                                actorItem.style = "background-color: #ffac11; cursor:default"
                                                            })

                                                            actorItem.addEventListener('click', (click) => {
                                                                main.removeChild(main.querySelector('#actorList'));
                                                                actorSearch.value = "";
                                                                let name = click.target.textContent;
                                                                console.log(name);
                                                                let addedActor = document.createElement('div');
                                                                addedActor.style = "display:flex; justify-content: space-between; background-color: off-white; border-style: solid; border-width:0.5px; border-radius: 10px; padding: 5px; margin: 3px"
                                                                let addedActorName = document.createElement('p');
                                                                addedActorName.textContent = name;
                                                                addedActorName.style = "display:inline; margin: 0px 10px 0px 0px;"
                                                                let actorRemoveBtn = document.createElement('button');
                                                                actorRemoveBtn.addEventListener('click', (obj) => {
                                                                    let parent = obj.target.parentElement;
                                                                    castDisplay.removeChild(parent);
                                                                })
                                                                actorRemoveBtn.type = "button";
                                                                actorRemoveBtn.classList = "btn-close";
                                                                addedActor.appendChild(addedActorName);
                                                                addedActor.appendChild(actorRemoveBtn);
                                                                castDisplay.appendChild(addedActor);
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                                let synopsisText = document.createElement('p');
                                let synopsis = document.createElement('textArea');
                                synopsis.placeholder = "Description here...";
                                synopsis.value = `${oldSynopsis}`;
                                synopsisText.textContent = `Enter a description of the movie (${255 - synopsis.value.length} left):`;
                                synopsis.addEventListener('keypress', (input) => {
                                    if (synopsis.value.length > 254) {
                                        synopsisText.textContent = `Enter a description of the movie (${255 - synopsis.value.length} left):`;
                                        input.preventDefault();
                                    } else {
                                        synopsisText.textContent = `Enter a description of the movie (${255 - synopsis.value.length} left):`;
                                    }
                                })
                                let ratingText = document.createElement('p');
                                ratingText.textContent = "Give the Movie a rating (0 - 5) :"
                                let rating = document.createElement('input');
                                rating.type = "range";
                                rating.min = 0;
                                rating.max = 5;
                                rating.step = 0.5;
                                rating.value = `${oldRating}`;
                                let ratingVerbose = document.createElement('p');
                                let ratingValue = 0.0;
                                rating.addEventListener('input', (slider) => {
                                    ratingValue = slider.target.value;
                                    ratingVerbose.textContent = `Rating: ${ratingValue}/5`;
                                })
                                ratingVerbose.textContent = `Rating: ${oldRating}/5`;
                                let submitBtn = document.createElement('button');
                                submitBtn.textContent = "Update";
                                submitBtn.classList = "btn btn-outline-success";
                                submitBtn.type = "button";



                                actorFunction = () => {
                                    let enabled = true;

                                    if (title.value == "") {
                                        enabled = false;

                                        TitleError();
                                    }

                                    if (synopsis.value.length > 255) {
                                        enabled = false;

                                        DescriptionError();
                                    }

                                    if (enabled) {

                                        let castList = document.querySelectorAll('#castDisplay > div > p');
                                        let actorArray = [];
                                        let i = 0;
                                        for (i = 0; i < castList.length; i++) {
                                        }

                                        let l = 0;
                                        actorAssign = (data) => {
                                            l++;
                                            if (l < i) {
                                                actorArray.push(data[0].id);
                                            } else {
                                                actorArray.push(data[0].id)
                                                console.log(actorArray);
                                                let actorObj;
                                                let actorIdArray = [];
                                                for (let v = 0; v < actorArray.length; v++) {
                                                    actorObj = {
                                                        id: actorArray[v]
                                                    }
                                                    actorIdArray.push(actorObj);
                                                }
                                                console.log(actorIdArray);
                                                let movieObj = {
                                                    "title": title.value,
                                                    "year": year.value,
                                                    "runtime": run.value,
                                                    "cast": actorIdArray,
                                                    "synopsis": synopsis.value,
                                                    "rating": rating.value
                                                }
                                                fetch(`http://localhost:8080/movies/update/${editId}`, {
                                                    method: "PUT",
                                                    headers: {
                                                        "content-type": "application/JSON"
                                                    },
                                                    body: JSON.stringify(movieObj)
                                                }).then((response) => {
                                                    if (response.status != 202) {
                                                        console.error(response);
                                                    } else {
                                                        response.json().then((data) => {
                                                            console.log(data);
                                                            page.removeChild(document.querySelector('#movieMenu'));
                                                            page.removeChild(document.querySelector('#overlay'));
                                                            MovieUpdated();

                                                            const formData = new FormData();
                                                            formData.append('image', imageBtn.files[0]);

                                                            fetch(`http://localhost:8080/movies/image/${data.id}`, {
                                                                method: "POST",
                                                                body: formData,

                                                            }).then((response) => {
                                                                if (response.status != 201) {
                                                                    console.error(response.statusText);
                                                                } else {
                                                                    response.json().then((data) => {
                                                                        console.log(data.imageUrl);
                                                                        let newUrl = data.imageUrl.replace(/\\/g, "/");
                                                                        console.log(newUrl);
                                                                    })
                                                                }
                                                            })

                                                        })
                                                    }
                                                })
                                            }
                                        }



                                        if (i > 0) {
                                            for (let aName of castList) {
                                                fetch(`http://localhost:8080/actors/get/${aName.textContent}`).then((response) => {
                                                    if (response.status != 200) {
                                                        console.error(response)
                                                    }
                                                    else {
                                                        return response.json().then((data) => {
                                                            actorAssign(data);
                                                        })
                                                    }
                                                })
                                            }
                                        } else {
                                            let movieObj = {
                                                "title": title.value,
                                                "year": year.value,
                                                "runtime": run.value,
                                                "synopsis": synopsis.value,
                                                "rating": rating.value
                                            }
                                            fetch(`http://localhost:8080/movies/update/${editId}`, {
                                                method: "PUT",
                                                headers: {
                                                    "content-type": "application/JSON"
                                                },
                                                body: JSON.stringify(movieObj)
                                            }).then((response) => {
                                                if (response.status != 202) {
                                                    console.error(response);
                                                } else {
                                                    alert(`Status: ${response.status}`);
                                                    response.json().then((data) => {
                                                        console.log(data);
                                                        page.removeChild(document.querySelector('#movieMenu'));
                                                        page.removeChild(document.querySelector('#overlay'));
                                                        MovieUpdated();
                                                        const formData = new FormData();
                                                        formData.append('image', imageBtn.files[0]);
                                                        fetch(`http://localhost:8080/movies/image/${data.id}`, {
                                                            method: "POST",
                                                            body: formData,
                                                        }).then((response) => {
                                                            if (response.status != 201) {
                                                                console.error(response.statusText);
                                                            } else {
                                                                response.json().then((data) => {
                                                                    console.log(data.imageUrl);
                                                                    let newUrl = data.imageUrl.replace(/\\/g, "/");
                                                                    console.log(newUrl);
                                                                })
                                                            }
                                                        })
                                                    })
                                                }
                                            })

                                        }
                                    }
                                }

                                closeBtn.addEventListener('click', () => {
                                    page.removeChild(document.querySelector('#movieMenu'));
                                    page.removeChild(document.querySelector('#overlay'));
                                })

                                submitBtn.addEventListener('click', actorFunction);

                                main.appendChild(closeBtn);
                                main.appendChild(titleText);
                                main.appendChild(title);
                                main.appendChild(imageText);
                                main.appendChild(imageBtn);
                                yearRunText.appendChild(yearText);
                                yearRunText.appendChild(runText);
                                main.appendChild(yearRunText);
                                yearRun.appendChild(year);
                                yearRun.appendChild(run);
                                main.appendChild(yearRun)
                                main.appendChild(castText);
                                main.appendChild(castDisplay);
                                main.appendChild(castDropDown);
                                main.appendChild(actorSearch);
                                main.appendChild(synopsisText);
                                main.appendChild(synopsis);
                                main.appendChild(ratingText);
                                main.appendChild(rating);
                                main.appendChild(ratingVerbose);
                                main.appendChild(submitBtn);

                                page.appendChild(overlay);
                                page.appendChild(main);
                            })
                        }
                    })
                })
            }
        })
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
    card.appendChild(image);
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