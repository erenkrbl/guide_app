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
        this.personList.addEventListener('click', this.updateOrDelete.bind(this));
        this.storage = new Storage();
        this.chooseLine = undefined;
        this.personWriteScreen();
    }

    updateOrDelete(e) {
        const clickPlace = e.target;
        if (clickPlace.classList.contains('btn--delete')) {
            this.chooseLine = clickPlace.parentElement.parentElement;
            this.personDeleteScreen();

            //console.log('Deleted');
        } else if (clickPlace.classList.contains('btn--edit')) {
            //console.log('update');
        }
        //console.log(this);
    }

    personDeleteScreen() {
        this.chooseLine.remove();
        const deletedEmail = this.chooseLine.cells[2].textContent;
        this.storage.personDelete(deletedEmail);
    }


    personWriteScreen() {
        this.storage.allPersons.forEach(person => {
            this.personAddScreen(person);
        });
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

            //
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
        this.allPersons = this.peopleBring();
    }

    peopleBring() {
        let allPersonsLocal;
        if (localStorage.getItem('allPersons') === null) {
            allPersonsLocal = [];
        } else {
            allPersonsLocal = JSON.parse(localStorage.getItem('allPersons'));
        }
        return allPersonsLocal;
    }
    personAdd(person){
        this.allPersons.push(person);
        localStorage.setItem('allPersons', JSON.stringify(this.allPersons));
    }
    personDelete(email) {
        this.allPersons.forEach((person, index) => {
            if (person.email === email) {
                this.allPersons.splice(index, 1);
            }
        });
        localStorage.setItem('allPersons', JSON.stringify(this.allPersons));
    }

    personUpdate(updatedPerson, email) {
        this.allPersons.forEach((person, index) => {
            if (person.email === email) {
                this.allPersons[index] = updatedPerson; 
            }
        });
        localStorage.setItem('allPersons', JSON.stringify(this.allPersons));
    }
}

document.addEventListener('DOMContentLoaded', function(e) {
    const screen = new Screen();
});