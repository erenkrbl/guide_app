class Person {
    constructor(firstname, lastname, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
}

class Util {
    static checkEmptyArea(...areas) {
        let result = true;
        areas.forEach(area => {
            if (area.length === 0) {
                result = false;
                return false;
            }
        });
        return result;
    }
}

class Screen {
    constructor () {
        this.firstname = document.getElementById('firstname');
        this.lastname = document.getElementById('lastname');
        this.email = document.getElementById('email');
        this.addUpdateButton = document.querySelector('.submitUpdate');
        this.form = document.getElementById('form-guide').addEventListener('submit', this.submitUpdate.bind(this));
        this.personList = document.querySelector('.person-list');
        this.storage = new Storage();
    }

    personAddScreen(person) {
        const createElementTr = document.createElement('tr');
        createElementTr.innerHTML = `<td>${person.firstname}</td>
        <td>${person.lastname}</td>
        <td>${person.email}</td>
        <td>
            <button class="btn btn--edit"><i class="far fa-edit"></i></button>
            <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
        </td>`;

        this.personList.appendChild(createElementTr);
    }

    submitUpdate(e) {
        e.preventDefault();
        const person = new Person(this.firstname.value, this.lastname.value, this.email.value);
        const result = Util.checkEmptyArea(person.firstname, person.lastname, person.email);

        if (result) { // All areas full
            this.personAddScreen(person);
            // localStorage add
            this.storage.personAdd(person);

            // console.log('Successful')
        } else { // Some areas empty
            console.log("Some areas empty");
        }

    }
}

class Storage {
    // fetch data when the app is first opened
    // uygulama ilk açıldığında veriler getirilir
    constructor() {
        this.allPersons = [];
    }

    peopleBring() {
        let allPersonsLocal;
        if (localStorage.getItem('allPersons') === null) {
            allPersonsLocal = [];
        } else {
            allPersonsLocal = JSON.parse(localStorage.getItem('allPersons'));
        }
        this.allPersons = allPersonsLocal;
        return allPersonsLocal;
    }
    personAdd(person){
        const allPersonsLocal = this.peopleBring();
        allPersonsLocal.push(person);
        localStorage.setItem('allPersons', JSON.stringify(allPersonsLocal));
    }
}

document.addEventListener('DOMContentLoaded', function(e) {
    const screen = new Screen();
});