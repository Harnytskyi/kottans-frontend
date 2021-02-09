const GRID = document.getElementById("allFriends");
const CHECKBOX_MAN = document.getElementById("gender-male");
const CHECKBOX_WOMAN = document.getElementById("gender-female");
const SORT_ALPHABET_ASCEND = document.getElementById("a-z");
const SORT_ALPHABET_DESCEND = document.getElementById("z-a");
const SEARCH_INPUT = document.getElementById('search');
const SORT_AGE_ASCEND = document.getElementById("0-9");
const SORT_AGE_DESCEND = document.getElementById("9-0");
let friends = [];
let gender = {
    male: true,
    female: true
}


let selectedFriends = [...friends];
function filterByGender() {
    if (gender.male == true && gender.female == true)
        selectedFriends = friends;
    else if (gender.male == true && gender.female == false)
        selectedFriends = friends.filter(item => item.gender == "male")
    else if (gender.male == false && gender.female == true)
        selectedFriends = friends.filter(item => item.gender == "female")
}
function displayFriends() {
    GRID.innerHTML = '';
    selectedFriends.forEach(item => {
        GRID.innerHTML += `<div id="${item.name}" class="card">
            <img class="photo" src="${item.photo}">
            <p class="name">${item.name}</p>
            <p class="age">Age: ${item.age}</p>
            <a class="phone" href="tel:${item.phone}">${item.phone}</a>
            <div class="email">
                <a href="mailto:${item.email}">
                    <button class="button-message">SEND MESSAGE</button>
                </a>
            </div>
        <div>`
    });
    search();
}

function changeFilterStatus(checkbox) {
    if (checkbox.checked) {
        gender[checkbox.value] = true;
    } else {
        if (checkbox.value == "male") {
            if (gender.female == false) {
                gender.female = true;
                CHECKBOX_WOMAN.click();
            }
        }
        else if (checkbox.value == "female") {
            if (gender.male == false) {
                gender.male = true;
                CHECKBOX_MAN.click();
            }
        }
        gender[checkbox.value] = false;
    }
    filterByGender();
    displayFriends();
}

function search() {
    let searchRequest = SEARCH_INPUT.value.toUpperCase();
    selectedFriends.forEach(item => {
        const FRIEND = document.getElementById(item.name)
        FRIEND.classList.remove('hidden');
        if (item.name.toUpperCase().indexOf(searchRequest) == -1) {
            FRIEND.classList.add('hidden');
        }
    })
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

CHECKBOX_MAN.addEventListener('change', function () {
    changeFilterStatus(CHECKBOX_MAN);
});
CHECKBOX_WOMAN.addEventListener('change', function () {
    changeFilterStatus(CHECKBOX_WOMAN);
});
SORT_ALPHABET_ASCEND.addEventListener('change', function () {
    sortFriends(this.value);
})
SORT_ALPHABET_DESCEND.addEventListener('change', function () {
    sortFriends(this.value);
})
SORT_AGE_ASCEND.addEventListener('change', function () {
    sortFriends(this.value);
})

SORT_AGE_DESCEND.addEventListener('change', function () {
    sortFriends(this.value);
})

function fetchUsers() {
    let targetUrl = "https://randomuser.me/api/?results=30&nat=au,ca,ch,de,dk,es,fr,gb,ie,no,nl,nz,us"

    fetch(targetUrl, { metod: "get" })
        .then((response) => {
            let json = response.json();
            if (response.status >= 200 && response.status < 300) {
                return json;
            }
            else {
                return error;
            }
        }).then((json) => {
            saveUsers(json.results);
        })
        .catch(function (error) {
            showErrorMessage(error);
        });
}

function saveUsers(usersArray) {
    usersArray.forEach(user => {
        let friend = {
            name: user.name.first + " " + user.name.last,
            age: user.dob.age,
            phone: user.cell,
            email: user.email,
            gender: user.gender,
            photo: user.picture.large
        }
        friends.push(friend);
    })
    selectedFriends = [...friends];
    displayFriends();
}
function showErrorMessage(error) {
    const field = document.getElementById("contentField");
    field.classList.add('error-text');
    field.innerHTML = `something wrong: <br>${error} <br> please reload the page`;
}

fetchUsers();
