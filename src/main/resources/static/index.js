

let random = document.querySelector('#randomBtn');


let movie;

let pickRandom = (movieList) => {
    let num = Math.floor(Math.random() * movieList.length);
    console.log(num);
    return movieList[num];
}

let getAll = () => {
    fetch(`http://localhost:8080/movies/get`).then((response) => {
        if (response.status != 200) {
            console.log(response);
        } else {
            response.json().then((data) => {
                let movieList = [];
                console.log(data);
                for (obj of data) {
                    console.log(obj);
                    movieList.push(obj);
                }
                console.log(movieList);
                console.log("sss")
                console.log(pickRandom(movieList));
            })
        }
    })
}



random.addEventListener('click', getAll);