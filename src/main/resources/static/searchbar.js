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
    main.style = "background-color: white; position: fixed; z-index: 10; min-width: 40%; max-width: 60%; min-height: 40%; max-height: 80%; border-radius: 50px;"
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
                title.style = "width: 40px";
                let yearText = document.createElement('p');
                yearText.textContent = "Release Year:";
                let year = document.createElement('input');
                let castText = document.createElement('p');
                castText.textContent = "Cast:";
                let castDisplay = document.createElement('div')
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
                        console.log(click);
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
                                    let actorList = document.createElement('ul');
                                    for (actor of data)
                                        console.log(`${actor.firstName} ${actor.lastName}`);
                                    let actorItem = document.createElement('li');
                                    let actorName = document.createElement('p');
                                    actorName.textContent = `${actor.firstName} ${actor.lastName}`;
                                    actorItem.appendChild(actorName);
                                    actorList.appendChild(actorItem);

                                })
                            }
                        })
                    }
                })


                main.appendChild(titleText);
                main.appendChild(title);
                main.appendChild(yearText);
                main.appendChild(year);
                main.appendChild(castText);
                main.appendChild(castDisplay);
                main.appendChild(castDropDown);
                main.appendChild(actorSearch);
                console.log("appended");
                // runtime
                // cast
                // synopsis
                // rating

                body.appendChild(overlay);
                body.appendChild(main);
            })
        }
    })
})