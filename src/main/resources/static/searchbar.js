console.log("loaded")
let body = document.querySelector('body');

let movieCreateBtn = document.querySelector('#movieCreate');

let actorCreateBtn = document.querySelector('#actorCreate');

let currentTheme = "light";


let searchTypeOne = 1;
let searchTypeTwo = 1;

let searchDropOne = document.querySelector('#search-drop-1');
let searchDropTwo = document.querySelector('#search-drop-2');
let searchInput = document.querySelector('#search-input');
let searchSubmit = document.querySelector('#search-submit');
let searchContainer = document.querySelector('#search-container');

searchDropOne.addEventListener('change', (drop) => {
    searchInput.value = "";
    if (drop.target.value == 1) {
        searchTypeOne = 1;
        searchDropTwo.style.display = "inline";
    } else if (drop.target.value == 2) {
        searchTypeOne = 2;
        searchDropTwo.style.display = "none";
    }
})

searchDropTwo.addEventListener('change', (drop) => {
    searchInput.value = "";
    if (drop.target.value == 1) {
        searchTypeTwo = 1;
    } else if (drop.target.value == 2) {
        searchTypeTwo = 2;
    } else if (drop.target.value == 3) {
        searchTypeTwo = 3;
    }
})

searchInput.addEventListener('focusin', (input) => {
    searchbarFunction(input, false);

})

//-----------------------------------------------------------------------------

searchInput.addEventListener('focusout', () => {
    setTimeout(
        () => {
            if (searchContainer.querySelector('#searchList')) {
                searchContainer.removeChild(searchContainer.querySelector('#searchList'));
            }
        }, 200);
})

// ---------------------------------------------------------------------------------

searchInput.addEventListener('input', (input) => {
    if (searchContainer.querySelector('#searchList')) {
        searchContainer.removeChild(searchContainer.querySelector('#searchList'));
    }
    searchbarFunction(input, false);
})


// --------------------------------------------------------------------------------
let searchbarFunction = (input, isSubmit) => {
    let value = input.target.value;
    if (value != "") {
        let fetchString = "";
        let auto = true;
        if (searchTypeOne == 2) {
            fetchString = `http://localhost:8080/actors/get/${value}`;
        } else {
            if (searchTypeTwo == 1) {
                fetchString = `http://localhost:8080/movies/get/title/${value}`;
            } else if (searchTypeTwo == 2) {
                fetchString = `http://localhost:8080/movies/get/year/${value}`;
                // auto = false;
            } else if (searchTypeTwo == 3) {
                fetchString = `http://localhost:8080/movies/get/cast/${value}`;
            } else {
                console.error("error");
            }
        }


        if (auto == true) {
            fetch(fetchString).then((response) => {
                if (response.status != 200 && response.status != 404) {
                    console.error(response);
                } else if (response.status == 404) {
                    console.warn(`no results found for: ${value}`);
                } else {
                    console.log(response);
                    console.log(fetchString);
                    response.json().then((data) => {
                        if (data.length > 0) {
                            let searchList = document.createElement('div');
                            if (searchDropOne == 2) {
                                for (let actor of data) {
                                    let actorItem = document.createElement('div');
                                    actorItem.style = `background-color: white; margin: 0px;`;
                                    let actorName = document.createElement('p');
                                    actorName.style = `margin: 0px; padding: 0px 0px 0px 5px `;
                                    actorName.textContent = `${actor.firstName} ${actor.lastName}`;
                                    actorItem.appendChild(actorName);
                                    searchList.appendChild(actorItem);
                                    searchList.style = `overflow-y: auto; position: absolute; z-index: 15; right:93px; top: 50px; min-width: 227px; max-height: 300px; background-color: white; border-style: solid; border-width: 1px; padding: 3px 0px; border-radius: 3px;`;

                                    searchList.id = "searchList";
                                    searchInput.insertAdjacentElement("afterend", searchList);

                                    actorItem.addEventListener('mouseout', () => {
                                        actorItem.style = "background-color: white";
                                    });

                                    actorItem.addEventListener('mouseover', () => {
                                        actorItem.style = "background-color: blue; cursor:default";
                                    });

                                    actorItem.addEventListener('click', (click) => {
                                        searchContainer.removeChild(searchContainer.querySelector('#searchList'));
                                        searchInput.value = click.target.textContent;
                                    });
                                }
                            } else if (searchDropOne != 2) {
                                for (let movie of data) {
                                    let movieItem = document.createElement('div');
                                    movieItem.style = `background-color: white; margin: 0px;`;
                                    let movieTitle = document.createElement('p');
                                    movieTitle.style = `margin: 0px; padding: 0px 0px 0px 5px `;
                                    movieTitle.textContent = `${movie.title} (${movie.year})`;
                                    movieItem.appendChild(movieTitle);
                                    searchList.appendChild(movieItem);
                                    searchList.style = `overflow-y: auto; position: absolute; z-index: 15; right:93px; top: 50px; min-width: 227px; max-height: 300px; background-color: white; border-style: solid; border-width: 1px; padding: 3px 0px; border-radius: 3px;`;

                                    searchList.id = "searchList";
                                    searchInput.insertAdjacentElement("afterend", searchList);

                                    movieItem.addEventListener('mouseout', () => {
                                        movieItem.style = "background-color: white";
                                    });

                                    movieItem.addEventListener('mouseover', () => {
                                        movieItem.style = "background-color: blue; cursor:default";
                                    });

                                    movieItem.addEventListener('click', (click) => {
                                        searchContainer.removeChild(searchContainer.querySelector('#searchList'));
                                        searchInput.value = click.target.textContent;
                                    });
                                }
                            }
                        }
                    });
                }
            });
        }
    }
}



// --------------------------------------------------------------------------

searchSubmit.addEventListener('click', () => {
    let value = searchInput.value;

    let fetchString = "";
    if (searchTypeOne == 2) {
        fetchString = `http://localhost:8080/actors/get/${value}`;
    } else {
        if (searchTypeTwo == 1) {
            fetchString = `http://localhost:8080/movies/get/title/${value}`;
        } else if (searchTypeTwo == 2) {
            fetchString = `http://localhost:8080/movies/get/year/${value}`;
        } else if (searchTypeTwo == 3) {
            fetchString = `http://localhost:8080/movies/get/cast/${value}`;
        } else {
            console.error("error");
        }
    }

    let searchType;
    fetch(fetchString).then((response) => {
        if (response.status != 200 && response.status != 404) {
            console.error(response);
        } else if (response.status == 404) {
            console.warn(`no results found for: ${value}`);
            let data = [];
            localStorage.setItem("data", JSON.stringify(data));
            localStorage.setItem("searchType", "none");
            window.open("results.html", "_self");
        } else {
            console.log(response);
            console.log(fetchString);
            response.json().then((data) => {
                if (searchDropOne == 2) {
                    searchType = "actor";
                } else {
                    searchType = "movie";
                }
                localStorage.setItem("data", JSON.stringify(data));
                localStorage.setItem("searchType", searchType);
                localStorage.setItem("fetchString", fetchString);
                window.open("results.html", "_self");
            })
        }
    })
})

// ---------------------------------------------------------------------------

let listActors = (() => {
    fetch('http://localhost:8080/actors/get').then((response) => {
        if (response.status != 200 && response.status != 404) {
            console.error(`Error: ${response.status}: ${response.message}`);
        } else if (response.status == 404) {
            console.log(response.message);
        } else {
            response.json().then((data) => {
                return data;
            })
        }
    })
})

actorCreateBtn.addEventListener('click', () => {
    let main = document.createElement('div');
    main.classList = "d-grid justify-content-center align-items-center align-self-center"
    main.style = "overflow: auto; background-color: white; position: fixed; z-index: 10; min-width: 40%; max-width: 97%; min-height: 40%; max-height: 90%; border-radius: 50px; padding: 20px; margin: 0px 30px 0px 30px;"
    main.id = "menu";
    console.log("create menu")
    let overlay = document.createElement('div');
    overlay.id = "overlay"
    overlay.style = "position: fixed; z-index: 5; min-height: 100%; min-width: 100%; background-color: rgba(0, 0, 0, 0.50);";

    fNameText = document.createElement('p');
    fNameText.textContent = "First Name:"
    fNameInput = document.createElement('input');
    lNameText = document.createElement('p');
    lNameText.textContent = "Last Name:"
    lNameInput = document.createElement('input');

    submitBtn = document.createElement('button');
    submitBtn.textContent = "Submit";
    submitBtn.classList = "btn btn-outline-success";
    submitBtn.type = "button";
    submitBtn.addEventListener('click', () => {
        if (fNameInput.value == "" || lNameInput.value == "") {
            console.error("name required");
        } else {
            console.log(overlay);
            let newActor = {
                "firstName": fNameInput.value,
                "lastName": lNameInput.value,
            }
            body.removeChild(document.querySelector('#menu'));
            body.removeChild(document.querySelector('#overlay'));
            fetch(`http://localhost:8080/actors/create`, {
                method: "POST",
                headers: {
                    "content-Type": "application/JSON"
                },
                body: JSON.stringify(newActor)
            }).then((response) => {
                if (response.status != 201) {
                    console.error(response);
                } else {
                    response.json().then((data) => {
                        console.log(data);
                    })
                }
            })
        }
    });


    overlay.addEventListener('click', () => {
        body.removeChild(document.querySelector('#menu'));
        body.removeChild(document.querySelector('#overlay'));
    })


    main.appendChild(fNameText);
    main.appendChild(fNameInput);
    main.appendChild(lNameText);
    main.appendChild(lNameInput);
    main.appendChild(submitBtn);
    body.appendChild(overlay);
    body.appendChild(main);
});

movieCreateBtn.addEventListener('click', () => {
    let main = document.createElement('div');
    main.classList = "d-grid justify-content-center align-items-center align-self-center"
    main.style = "overflow: auto; background-color: white; position: fixed; z-index: 10; min-width: 40%; max-width: 97%; min-height: 40%; max-height: 90%; border-radius: 50px; padding: 20px; margin: 0px 30px 0px 30px; top:10%; bottom:10%"
    main.id = "menu";
    console.log("create menu")
    let overlay = document.createElement('div');
    overlay.id = "overlay";
    overlay.style = "position: fixed; z-index: 5; min-height: 100%; min-width: 100%; background-color: rgba(0, 0, 0, 0.50);";
    overlay.addEventListener('click', () => {
        body.removeChild(document.querySelector('#menu'));
        body.removeChild(document.querySelector('#overlay'));
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



                let titleText = document.createElement('p');
                titleText.textContent = "Title:"
                let title = document.createElement('input');
                title.type = "text";
                title.classList = "has-validation";
                let yearText = document.createElement('p');
                let runText = document.createElement('p');
                let yearRunText = document.createElement('div');
                yearText.textContent = "Release Year:";
                runText.textContent = "Approx. Runtime:"
                yearRunText.style = "display: inline-flex; justify-content: space-between"
                let year = document.createElement('input');
                year.style = "width: 100px";
                year.type = "number";
                let run = document.createElement('input');
                run.style = "width: 100px";
                run.type = "number";
                let yearRun = document.createElement('div');
                yearRun.style = "display: inline-flex; justify-content: space-around"
                let castText = document.createElement('p');
                castText.textContent = "Cast:";
                let castDisplay = document.createElement('div')
                castDisplay.id = "castDisplay"
                castDisplay.style = "min-width: 250px; min-height: 40px; border-radius: 10px; border-style: solid; border-width: 1px";
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
                    curActor.addEventListener('click', (click) => {
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
                    castDropDown.appendChild(curActor);
                }
                actorSearch = document.createElement('input');
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
                                                actorItem.style = "background-color: blue; cursor:default"
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
                synopsisText.textContent = "Enter a description of the movie:";
                let synopsis = document.createElement('textArea');
                synopsis.placeholder = "Description here...";
                synopsis.maxlength = 255;
                let ratingText = document.createElement('p');
                ratingText.textContent = "Give the Movie a rating (0 - 5) :"
                let rating = document.createElement('input');
                rating.type = "range";
                rating.min = 0;
                rating.max = 5;
                rating.step = 0.5;
                rating.value = 0.0;
                let ratingVerbose = document.createElement('p');
                let ratingValue = 0.0;
                rating.addEventListener('input', (slider) => {
                    ratingValue = slider.target.value;
                    ratingVerbose.textContent = `Rating: ${ratingValue}/5`;
                })
                ratingVerbose.textContent = `Rating: ${ratingValue}/5`;
                submitBtn = document.createElement('button');
                submitBtn.textContent = "Submit";
                submitBtn.classList = "btn btn-outline-success";
                submitBtn.type = "button";



                actorFunction = () => {
                    let enabled = true;

                    if (title.value == "") {
                        console.log("dsas")
                        enabled = false;

                        alert("Movie requires a title");
                    }

                    if (synopsis.value.length > 255) {
                        enabled = false;

                        alert("description can not be longer than 255 characters");
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
                                fetch("http://localhost:8080/movies/create", {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/JSON"
                                    },
                                    body: JSON.stringify(movieObj)
                                }).then((response) => {
                                    if (response.status != 201) {
                                        console.error(response);
                                    } else {
                                        alert(`Status: ${response.status}`);
                                        response.json().then((data) => {
                                            console.log(data);
                                            body.removeChild(document.querySelector('#menu'));
                                            body.removeChild(document.querySelector('#overlay'));
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
                            fetch("http://localhost:8080/movies/create", {
                                method: "POST",
                                headers: {
                                    "content-type": "application/JSON"
                                },
                                body: JSON.stringify(movieObj)
                            }).then((response) => {
                                if (response.status != 201) {
                                    console.error(response);
                                } else {
                                    alert(`Status: ${response.status}`);
                                    response.json().then((data) => {
                                        console.log(data);
                                        body.removeChild(document.querySelector('#menu'));
                                        body.removeChild(document.querySelector('#overlay'));
                                    })
                                }
                            })

                        }
                    }
                }

                submitBtn.addEventListener('click', actorFunction);


                main.appendChild(titleText);
                main.appendChild(title);
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

                console.log("appended");

                body.appendChild(overlay);
                body.appendChild(main);
            })
        }
    })
})