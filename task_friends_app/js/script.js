const GRID = document.getElementById("allFriends");
const CHECKBOX_MAN = document.getElementById("gender-male");
const CHECKBOX_WOMAN = document.getElementById("gender-female");
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

function displayFriends(){
    const ALL_FRIENDS = document.createDocumentFragment();
    let selectedFriends;
    if(male == true && female == true)
    selectedFriends = FRIENDS;
    else if(male == true && female == false)
    selectedFriends = FRIENDS.filter(item => item.gender == "male")
    else if(male == false && female == true)
    selectedFriends = FRIENDS.filter(item => item.gender == "female")
    GRID.innerHTML ='';
    selectedFriends.forEach(item => {
        const card = document.createElement('div');
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
        phone.append("+"+item.phone);
        card.append(phone);
        const email = document.createElement('button');
        const emaillink = document.createElement('a');
        emaillink.href = "mailto:" + item.email;
        emaillink.append("SEND MESSAGE");
        email.append(emaillink);
        card.append(email);
        ALL_FRIENDS.append(card);
    });
    GRID.append(ALL_FRIENDS);
}
let male = true;
let female = true;
function filter(mass, sex){
    let newMass = mass.filter(item => item.gender == sex)
    console.log(newMass);
}

// function change(sex){
//     filter(FRIENDS, sex);
// }


// function chg(sex){
//     if(CHECKBOX_MAN)
//     filter(FRIENDS, sex)
// }
// function launchFilter(checkbox, sex){
//     if (checkbox.checked) {
//         filter(FRIENDS, sex);
//     } else {
//       console.log("Checkbox is not checked..");
//     }
// }
function changeFilterStatus(checkbox, sex){
    if (checkbox.checked) {
        if (sex == "male")
        male = true;
        if (sex == "female")
        female = true;
        console.log(sex + "true");
    } else {
        if (sex == "male"){
            if(female == false){
                female = true;
                CHECKBOX_WOMAN.click();
            }

            male = false;
        }
        if (sex == "female"){
                if(male == false){
                    male = true;
                    CHECKBOX_MAN.click();
                }
            female = false;
        }
        console.log(sex + "false");
    }
    displayFriends();
}

CHECKBOX_MAN.addEventListener('change', function() {
    changeFilterStatus(CHECKBOX_MAN, "male");
    //launchFilter(CHECKBOX_MAN, "male");
  });
CHECKBOX_WOMAN.addEventListener('change', function() {
    changeFilterStatus(CHECKBOX_WOMAN, "female");
    //launchFilter(CHECKBOX_WOMAN, "female");
});
//CHECKBOX_MAN.addEventListener('change', change("male"));
displayFriends();
