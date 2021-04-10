class Person {
    constructor(firstname, lastname, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
}


class Screen {
    constructor () {
        this.firstname = document.getElementById('firstname');
        this.lastname = document.getElementById('lastname');
        this.email = document.getElementById('email');
        this.addUpdateButton = document.querySelector('.submitUpdate');
        this.form = document.getElementById('form-guide').addEventListener('submit', this.submitUpdate);
        this.storage = new Storage();
    }

    submitUpdate(e) {
        e.preventDefault();
        console.log("Work...");
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