const showPreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log('showPreloader()');
    preloader.style.display = 'block';

}

const hidePreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log('hidePreloader()');
    preloader.style.display = 'none';

}

const getData = () => {

    fetch('https://akademia108.pl/api/ajax/get-users.php', {
        mode: 'cors',
        method: 'GET'
    })
        .then(response => response.json()) //gdy dane zostaną pobrane - zamień response na jsona przy pomocy metody json
        .then(data => {

            let body = document.body;
            let hr = document.createElement('hr');
            body.appendChild(hr);

            for (let user of data) {
                let pUserId = document.createElement('p');
                let pUserName = document.createElement('p');
                let pUserUrl = document.createElement('p');
                let pLine = document.createElement('p');

                pUserId.innerText = `User ID: ${user.id}`;
                pUserName.innerText = `User Name: ${user.name}`;
                pUserUrl.innerText = `User URL: ${user.website}\n--------`;

                body.appendChild(pUserId);
                body.appendChild(pUserName);
                body.appendChild(pUserUrl);
            }

            hidePreloader();
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
}

const scrollToEndOfPage = () => {

    let d = document.documentElement;

    //height of an element's content, including content not visible on the screen
    let scrollHeight = d.scrollHeight;

    //nr of pixels that an element's content is scrolled from the top
    let scrollTop = d.scrollTop;

    //inner height of an element in pixels (in our case - height of browser)
    let clientHeight = d.clientHeight;

    //Math.ceil(nr) - zaokrąglanie w górę, ochrona przed ułamkami w niektórych przeglądarkach
    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight); 

    console.log(`scrollHeight: ${scrollHeight}`);
    console.log(`scrollTop: ${scrollTop}`);
    console.log(`clientHeight: ${clientHeight}`);
    console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);
    console.log('-----------------');

    if (sumScrollTopClientHeight >= scrollHeight) { // > to zabezpieczenie przed ułamkami w niektórych przeglądarkach
        console.log('Scrolled to the end of the page');
        showPreloader();
        getData();
    }
}

window.addEventListener('scroll', scrollToEndOfPage);