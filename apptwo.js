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

    static emailValid(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

class Screens {
    constructor () {
        this.firstname = document.getElementById('firstname');
        this.lastname = document.getElementById('lastname');
        this.email = document.getElementById('email');
        this.addUpdateButton = document.querySelector('.submitUpdate');
        this.form = document.getElementById('form-guide');
        this.form.addEventListener('submit', this.submitUpdate.bind(this));
        this.personList = document.querySelector('.person-list');
        this.personList.addEventListener('click', this.updateOrDelete.bind(this));

        this.storagem = new Storagem();

        this.chooseLine = undefined;
        this.personWriteScreen();
    }

    createdInformation(message, situation) {
        const warnDiv = document.querySelector('.info');

        warnDiv.innerHTML = message;

        warnDiv.classList.add(situation ? 'info--success' : 'info--error');

    // setTimeout, setInterval

        setTimeout(function () {
            warnDiv.className = 'info';
        
        }, 2000)
    
    }

    submitUpdate(e) {
        e.preventDefault();
        const person = new Person(this.firstname.value, this.lastname.value, this.email.value);
        const result = Util.checkEmptyArea(person.firstname, person.lastname, person.email);
        const emailValid = Util.emailValid(this.email.value);
        console.log(this.email.value + "for email check:" +emailValid);

        if (result) { // All areas full
            if(!emailValid) {
                this.createdInformation('write a valid email', false);
                return;
            }
            
            if (this.chooseLine) {
                
                this.personUpdateScreen(person);
                
            } else {
                const result = this.storagem.personAdd(person);
                console.log("result : " + result + "submit update");
                if (result) {
                    this.createdInformation("Added Successfull", true);
                    this.personAddScreen(person);
                    this.cleanAreas();
                } else {
                    this.createdInformation("Email is in use", false);
                }
            }

        } else { // Some areas empty
            this.createdInformation('Fill in the blanks fields', false);
        }

    }

    cleanAreas() {
        this.firstname.value = '';
        this.lastname.value = '';
        this.email.value = '';
    
    }

    updateOrDelete(e) {
        const clickPlace = e.target;

        if (clickPlace.classList.contains('btn--delete')) {
            this.chooseLine = clickPlace.parentElement.parentElement;
            this.personDeleteScreen();

            //console.log('Deleted');
        } else if (clickPlace.classList.contains('btn--edit')) {
            //console.log('update');
            this.chooseLine = clickPlace.parentElement.parentElement;
            this.addUpdateButton.value = 'Update';
            this.firstname.value = this.chooseLine.cells[0].textContent;
            this.lastname.value = this.chooseLine.cells[1].textContent;
            this.email.value = this.chooseLine.cells[2].textContent;
            
        }
        //console.log(this);
    }

    personUpdateScreen (person) {

        const result = this.storagem.personUpdate(person, this.chooseLine.cells[2].textContent); // personUpdate don't see
        
        if (result) {

            this.chooseLine.cells[0].textContent = person.firstname;
            this.chooseLine.cells[1].textContent = person.lastname;
            this.chooseLine.cells[2].textContent = person.email;
            
            this.cleanAreas();
            this.chooseLine = undefined;
            this.addUpdateButton.value = 'Submit';
            this.createdInformation('Person Updated', true);
        } else {
            this.createdInformation('Wrinting email is use', false)
        }


    }

    personDeleteScreen() {
        this.chooseLine.remove();
        const deletedEmail = this.chooseLine.cells[2].textContent;

        this.storagem.personDelete(deletedEmail); // personDelete don't see
        this.cleanAreas();
        this.chooseLine = undefined;
        this.createdInformation('Deleted', true);
    }


    personWriteScreen() {
        this.storagem.allPersons.forEach(person => { // allPersons don't see
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

}

class Storagem {
    // fetch data when the app is first opened
    // uygulama ilk açıldığında veriler getirilir
    constructor() {
        this.allPersons = this.peopleBring();
    }

    emailUnique(email) {
        const result = this.allPersons.find(person => {
            return person.email === email;
        });

        if (result) {
            console.log(email + 'İn use');
            return false;
        } else {
            console.log(email + 'Not in use, adding and updating is possible');
            return true;
        }
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
    personAdd(person) {
        if (this.emailUnique(person.email)) {

            this.allPersons.push(person);
            localStorage.setItem('allPersons', JSON.stringify(this.allPersons));
            return true;
        } else {
            return false;
        }
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
        if (updatedPerson.email === email) {
            
            this.allPersons.forEach((person, index) => {
                if (person.email === email) {
                    console.log("Person find in for");
                    this.allPersons[index] = updatedPerson; 
                    localStorage.setItem('allPersons', JSON.stringify(this.allPersons));
                    return true;
                }
            });

            return true;
        }

        if (this.emailUnique(updatedPerson.email)) {
            console.log(updatedPerson.email + " for checked and result : updating");


            this.allPersons.forEach((person, index) => {
                if (person.email === email) {
                    console.log("Person find in for");
                    this.allPersons[index] = updatedPerson; 
                    localStorage.setItem('allPersons', JSON.stringify(this.allPersons));
                    return true;
                }
            });

            return true;
        } else {
            console.log(updatedPerson.email + " Email is in use, isn't updating");
            return false
        }
    }
}

document.addEventListener('DOMContentLoaded', function(e) {
    const screens = new Screens();
});

