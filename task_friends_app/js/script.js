const GRID_OF_CARDS = document.getElementById("allFriends");
const SEARCH_INPUT = document.getElementById('search');
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
}
function displayFriends() {
    // if (selectedFriends.length == 0){
    //     showInfoMessage("No one was found");
    // }
    // else{
        GRID_OF_CARDS.innerHTML = selectedFriends.map(item => {
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
function selectFriends() {
    filterByGender();
    console.log(selectedFriends);
    findFriends();
    displayFriends();
}

function findFriends() {
    let searchRequest = SEARCH_INPUT.value.toUpperCase();
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
            friends.sort((a,b) => a.name.localeCompare(b.name));
            break;
        case 'alphabet-descend':
            friends.sort((a,b) => b.name.localeCompare(a.name));
            break;
        case 'age-ascend':
            friends.sort((a, b) => a.age - b.age);
            break;
        case 'age-descend':
            friends.sort((a, b) => b.age - a.age);
            break;
      }
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
    selectFriends();
})
FILTER_SORT.addEventListener('change', (event) => {
    const target = event.target;
    sortFriends(target.value);
    selectFriends();
})

initApp();
