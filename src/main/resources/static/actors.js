'use strict'

let createCardActor = (actor) => {
    let card = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');
    let id = document.createElement('p');
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
        let cardId = button.target.parentElement.parentElement.id;
        let editId = cardId.split('id').join('');

        fetch(`http://localhost:8080/actors/get/id/${editId}`).then((response) => {
            if (response.status != 200) {
                console.error(response)
            } else {
                response.json().then((data) => {

                    let main = document.createElement('div');
                    main.classList = "d-grid justify-content-center align-items-center align-self-center"
                    main.style = "overflow: auto; background-color: white; position: fixed; z-index: 10; min-width: 40%; max-width: 97%; min-height: 40%; max-height: 90%; border-radius: 50px; padding: 20px; margin: 0px 30px 0px 30px;"
                    main.id = "menu";
                    console.log("create menu")
                    let overlay = document.createElement('div');
                    overlay.id = "overlay"
                    overlay.style = "position: fixed; z-index: 5; min-height: 100%; min-width: 100%; background-color: rgba(0, 0, 0, 0.50);";

                    let fNameText = document.createElement('p');
                    fNameText.textContent = "First Name:"
                    let fNameInput = document.createElement('input');
                    fNameInput.value = data.firstName;

                    let lNameText = document.createElement('p');
                    lNameText.textContent = "Last Name:"
                    let lNameInput = document.createElement('input');
                    lNameInput.value = data.lastName;

                    let submitBtn = document.createElement('button');
                    submitBtn.textContent = "Update";
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
                            fetch(`http://localhost:8080/actors/update/${editId}`, {
                                method: "PUT",
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
                })
            }
        })
    });



    card.appendChild(deleteBtn);
    card.appendChild(editBtn);
    card.appendChild(id);
    // card.appendChild(image);
    card.appendChild(body);
    card.style = "min-width: 300px";

    container.appendChild(card);

}

fetch('http://localhost:8080/actors/get').then((response) => {
    if (response.status != 200) {
        console.error(response)
    } else {
        response.json().then((data) => {
            if (data.length > 0) {

                for (let actor of data) {
                    createCardActor(actor)
                }

            } else {
                console.log("no results");
            }
        })
    }
})
