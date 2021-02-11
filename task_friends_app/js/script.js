const GRID = document.getElementById("allFriends");
const CHECKBOX_MAN = document.getElementById("gender-male");
const CHECKBOX_WOMAN = document.getElementById("gender-female");
const SORT_ALPHABET_ASCEND = document.getElementById("a-z");
const SORT_ALPHABET_DESCEND = document.getElementById("z-a");
const SEARCH_INPUT = document.getElementById('search');
const SORT_AGE_ASCEND = document.getElementById("0-9");
const SORT_AGE_DESCEND = document.getElementById("9-0");
const FILTER_SORT = document.getElementById("filter-sort");
const FILTER_GENDER = document.getElementById("filter-gender");
let friends = [];
let gender = {
    male: true,
    female: true
}

let selectedFriends;
function saveUsers(usersArray) {
    friends = usersArray.map(user => {
        return {
            name: `${user.name.first} ${user.name.last}`,
            age: user.dob.age,
            phone: user.cell,
            email: user.email,
            gender: user.gender,
            photo: user.picture.large
        }
    })
    console.log(friends);
}
function filterByGender() {
    if (gender.male == true && gender.female == true)
        selectedFriends = friends;
    else if (gender.male == true && gender.female == false)
        selectedFriends = friends.filter(item => item.gender == "male")
    else if (gender.male == false && gender.female == true)
        selectedFriends = friends.filter(item => item.gender == "female")
    else
        selectedFriends = [];
    search();
}
function displayFriends() {
    // if (selectedFriends.length == 0){
    //     showInfoMessage("No one was found");
    // }
    // else{
        GRID.innerHTML = selectedFriends.map(item => {
            return `<div id="${item.name}" class="card">
                <img class="photo" src="${item.photo}">
                <p class="name">${item.name}</p>
                <p class="age">Age: ${item.age}</p>
                <a class="phone" href="tel:${item.phone}">${item.phone}</a>
                <div class="email">
                    <a href="mailto:${item.email}">
                        <button class="button-message">SEND MESSAGE</button>
                    </a>
                </div>
            </div>`
        }).join("");
    //}
}

function changeFilterStatus(checkbox) {
    gender[checkbox.value] = !gender[checkbox.value];
}
function searchEvent() {
    filterByGender();
    displayFriends();
}

function search() {
    let searchRequest = SEARCH_INPUT.value.toUpperCase();
    searchedFriends = [];
    searchedFriends = selectedFriends.filter(item => 
        (item.name.toUpperCase().includes(searchRequest))   
    )
    selectedFriends = searchedFriends;
}

function sortFriends(value) {
    let criterion;
    let order;
    switch (value) {
        case 'alphabet-ascend':
            criterion = 'name';
            break;
        case 'alphabet-descend':
            criterion = 'name';
            order = 'descending';
            break;
        case 'age-ascend':
            criterion = 'age';
            break;
        case 'age-descend':
            criterion = 'age';
            order = 'descending';
            break;
    }
    friends.sort((a, b) => {
        if (order == "descending") {
            let c = a;
            a = b;
            b = c;
        }
        if (a[criterion] > b[criterion]) return 1;
        if (a[criterion] == b[criterion]) return 0;
        if (a[criterion] < b[criterion]) return -1;
    })
    filterByGender();
    displayFriends();
}

function initApp() {
    let targetUrl = "https://randomuser.me/api/?results=30&nat=au,ca,ch,de,dk,es,fr,gb,ie,no,nl,nz,us"

    fetch(targetUrl)
        .then((response) => response.json())
        .then((json) => {
            saveUsers(json.results);
            filterByGender();
            displayFriends();
        })
        .catch(function (error) {
            showErrorMessage(error);
        });
}


function showInfoMessage(info){
    const field = document.getElementById("contentField");
    field.classList.add('error-text');
    field.innerHTML = `${info}`;
}
function showErrorMessage(error) {
    const field = document.getElementById("contentField");
    field.classList.add('error-text');
    field.innerHTML = `something wrong: <br>${error} <br> please reload the page`;
}

FILTER_GENDER.addEventListener('change', (event) => {
    const target = event.target;
    changeFilterStatus(target);
    filterByGender();
    displayFriends();
})
FILTER_SORT.addEventListener('change', (event) => {
    let target = event.target;
    sortFriends(target.value);
})

initApp();
