console.log("loaded")
let body = document.querySelector('body');

let movieCreateBtn = document.querySelector('#movieCreate');

let actorCreateBtn = document.querySelector('#actorCreate');


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
                    curActor.addEventListener('click', (value) => {
                        defaultCast.selected = true;
                        console.log(value);
                    })
                    castDropDown.appendChild(curActor);
                }

                main.appendChild(titleText);
                main.appendChild(title);
                main.appendChild(yearText);
                main.appendChild(year);
                main.appendChild(castText);
                main.appendChild(castDisplay);
                main.appendChild(castDropDown);
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