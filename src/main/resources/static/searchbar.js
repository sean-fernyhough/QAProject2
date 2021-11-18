console.log("loaded")
let body = document.querySelector('body');

let movieCreateBtn = document.querySelector('#movieCreate');

let actorCreateBtn = document.querySelector('#actorCreate');

let currentTheme = "light";

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

movieCreateBtn.addEventListener('click', () => {
    let main = document.createElement('div');
    main.classList = "d-grid justify-content-center align-items-center align-self-center"
    main.style = "background-color: white; position: fixed; z-index: 10; min-width: 40%; max-width: 60%; min-height: 40%; max-height: 80%; border-radius: 50px; padding: 20px"
    console.log("create menu")
    let overlay = document.createElement('div');
    overlay.style = "position: fixed; z-index: 5; min-height: 100%; min-width: 100%; background-color: rgba(0, 0, 0, 0.50);";



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
                                            actorList.style = `background-color: white; border-style: solid; border-width: 1px; padding: 3px 0px 3px 0px; border-radius: 3px`;
                                            actorList.id = "actorList";
                                            main.append(actorList);

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
                        }
                    }





                    for (let aName of castList) {
                        let actorFetch = fetch(`http://localhost:8080/actors/get/${aName.textContent}`).then((response) => {
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
                    // console.log(
                    //     title.value,
                    //     year.value,
                    //     run.value,

                    // );

                    let movie = {
                    }
                    // fetch("http://localhost:8080/movies/create", {
                    //     method: "POST",
                    //     headers: {
                    //         "content-type": "application/JSON"
                    //     },
                    //     body: JSON.stringify(movie)
                    // }).then()
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
                main.appendChild(submitBtn)

                console.log("appended");

                body.appendChild(overlay);
                body.appendChild(main);
            })
        }
    })
})