const GRID = document.getElementById("allFriends");
const CHECKBOX_MAN = document.getElementById("gender-male");
const CHECKBOX_WOMAN = document.getElementById("gender-female");
const SORT_AZ = document.getElementById("a-z");
const SORT_ZA = document.getElementById("z-a");
const SEARCH_INPUT = document.getElementById('search');
const SORT_09 = document.getElementById("0-9");
const SORT_90 = document.getElementById("9-0");
const FRIENDS = [
    {
        name: "Tom",
        age: 18,
        phone: 88003555555,
        email: "tom@dom.com",
        gender: "male",
    },
    {
        name: "Katia",
        age: 21,
        phone: +380634579216,
        email: "katia@lovekiss.com",
        gender: "female",
    }
]

let selectedFriends = [...FRIENDS];
function filter() {
    if (gender.male == true && gender.female == true)
        selectedFriends = FRIENDS;
    else if (gender.male == true && gender.female == false)
        selectedFriends = FRIENDS.filter(item => item.gender == "male")
    else if (gender.male == false && gender.female == true)
        selectedFriends = FRIENDS.filter(item => item.gender == "female")
}
function displayFriends() {
    const ALL_FRIENDS = document.createDocumentFragment();

    GRID.innerHTML = '';
    selectedFriends.forEach(item => {
        const card = document.createElement('div');
        card.id = item.name;
        card.classList.add('card');
        const name = document.createElement('p');
        name.classList.add("name");
        name.innerHTML = "Name: " + item.name;
        card.append(name);
        const age = document.createElement('p');
        age.classList.add("age");
        age.innerHTML = "Age: " + item.age;
        card.append(age);
        const phone = document.createElement('a');
        phone.classList.add("phone");
        phone.href = "tel:+" + item.phone;
        phone.append("+" + item.phone);
        card.append(phone);
        const email = document.createElement('button');
        const emaillink = document.createElement('a');
        email.append("SEND MESSAGE");
        emaillink.append(email);
        emaillink.href = "mailto:" + item.email;
        card.append(emaillink);
        ALL_FRIENDS.append(card);
    });
    GRID.append(ALL_FRIENDS);
    search();
}
let gender = {
    male: true,
    female: true
}

function changeFilterStatus(checkbox, sex) {
    if (checkbox.checked) {
        gender[sex] = true;
    } else {
        if (sex == "male") {
            if (gender.female == false) {
                gender.female = true;
                CHECKBOX_WOMAN.click();
            }
        }
        else if (sex == "female") {
            if (gender.male == false) {
                gender.male = true;
                CHECKBOX_MAN.click();
            }
        }
        gender[sex] = false;
    }
    filter();
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

function sortFriends(criterion, order) {
    FRIENDS.sort((a, b) => {
        if (order == "descending") {
            let c = a;
            a = b;
            b = c;
        }
        if (a[criterion] > b[criterion]) return 1;
        if (a[criterion] == b[criterion]) return 0;
        if (a[criterion] < b[criterion]) return -1;
    })
    filter();
    displayFriends();
}

CHECKBOX_MAN.addEventListener('change', function () {
    changeFilterStatus(CHECKBOX_MAN, "male");
});
CHECKBOX_WOMAN.addEventListener('change', function () {
    changeFilterStatus(CHECKBOX_WOMAN, "female");
});
SORT_AZ.addEventListener('click', function () {
    sortFriends("name");
})
SORT_ZA.addEventListener('click', function () {
    sortFriends("name", "descending");
})
SORT_09.addEventListener('click', function () {
    sortFriends("age");
})

SORT_90.addEventListener('click', function () {
    sortFriends("age", "descending");
})

displayFriends();
