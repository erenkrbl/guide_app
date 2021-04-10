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
        this.storage = new Storage();
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



const eric = new Person('Eric', 'Khan', 'er@kh.com');
const screen = new Screen();