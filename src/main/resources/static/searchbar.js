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
    main.classList = "d-grid justify-content-center"
    main.style = "background-color: white; position: relative; z-index: 10; top: 50%; left: 30%; right: 30%; max-width: 40%; min-height: 50%; border-radius: 50px"
    console.log("create menu")



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
                let year = document.createElement('input')
                console.log(cast);

                main.appendChild(titleText);
                main.appendChild(title);
                console.log("appended");
                // year
                // runtime
                // cast
                // synopsis
                // rating

                body.appendChild(main)
            })
        }
    })
})