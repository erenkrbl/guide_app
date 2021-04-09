// Let's choose interface

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');

const form = document.getElementById('form-guide');
const personList = document.querySelector('.person-list');

// event listeners define

form.addEventListener('submit', Submit);

personList.addEventListener('click', makePersonTransactions);

// All person for array

const allPersonArray = [];

let selectedLine = undefined;


function makePersonTransactions(event) {
    //console.log(event.target);
    if (event.target.classList.contains('btn--delete')) {
        const deleteTr = event.target.parentElement.parentElement;
        const deleteMail = event.target.parentElement.previousElementSibling.textContent
        guideDelete(deleteTr, deleteMail);
        //console.log('Delete');
    } else if (event.target.classList.contains('btn--edit')) {
        document.querySelector('.submitUpdate').value = 'Update';
        const selectedTr = event.target.parentElement.parentElement;
        const updateMail = selectedTr.cells[2].textContent;

        firstname.value = selectedTr.cells[0].textContent;
        lastname.value = selectedTr.cells[1].textContent;
        email.value = selectedTr.cells[2].textContent;

        selectedLine = selectedTr;
        console.log(allPersonArray);
    }
}

function guideDelete(deleteTrElement, deleteMail){  
    deleteTrElement.remove();
    console.log(deleteTrElement, deleteMail);
    /*
    allPersonArray.forEach((person, index) => {
        if (person.email === deleteMail) {
            allPersonArray.splice(index, 1)
        }
    });
    */

    const indeliblePersons = allPersonArray.filter(function(person, index) {
        return person.email !== deleteMail;
    });

    allPersonArray.length = 0;
    allPersonArray.push(...indeliblePersons);
    
    console.log('Delete done');
    console.log(allPersonArray);


}

function Submit(e) {
    e.preventDefault();

    const addOrUpdatePerson = {
        firstname : firstname.value,
        lastname : lastname.value,
        email : email.value,
    }
    const result = dataCheck(addOrUpdatePerson);
    if (result.statu) {
        if (selectedLine) {
            // update
            personUpdate(addOrUpdatePerson);
        } else {
            personToAdd(addOrUpdatePerson);

        }
    } else {
        infoCreate(result.message, result.statu);
    }

    //console.log(addPerson);
}

function personUpdate(person) {
    // Selected person's in the person parameter has new value 
    // Selected line has old value

    for (let i = 0; i < allPersonArray.length; i++){
        if (allPersonArray[i].email === selectedLine.cells[2].textContent) {
            allPersonArray[i] = person;
            break;
        }
    }


    selectedLine.cells[0].textContent = person.firstname;
    selectedLine.cells[1].textContent = person.lastname;
    selectedLine.cells[2].textContent = person.email;

    document.querySelector('.submitUpdate').value = 'Submit';
    selectedLine = undefined;
    
    console.log(allPersonArray);

}

function personToAdd(addPerson) {
    const createTrElement = document.createElement('tr');
    createTrElement.innerHTML = `<td>${addPerson.firstname}</td>
    <td>${addPerson.lastname}</td>
    <td>${addPerson.email}</td>
    <td>
        <button class="btn btn--edit"><i class="far fa-edit"></i></button>
        <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
    </td>`;

    personList.appendChild(createTrElement);
    allPersonArray.push(addPerson);
    infoCreate('Person has added to guide', true);


}

function dataCheck(person) {
    // use in  at objects
    for (const value in person) {
        if (person[value]) {
            console.log(person[value])
        } else {
            const result = {
                statu : false,
                message : 'Do not empty'  
            }
            return result;
        }
    }
    cleanAreas();
    return {
        statu : true,
        message : 'Record'
    }

}

function infoCreate  (message, statu) {
    const createdInfo = document.createElement('div');
    createdInfo.textContent = message;
    createdInfo.className = 'info';

    // if (statu) {
    //     createdInfo.classList.add('info--success');
    // } else {
    //     createdInfo.classList.add('info--error')
    // }

    createdInfo.classList.add( statu ? 'info--success' : 'info--error' );


    document.querySelector('.container').insertBefore(createdInfo, form);

    // setTimeout, setInterval

    setTimeout(function () {
        const deleteDiv = document.querySelector('.info');
        if (deleteDiv) {
            deleteDiv.remove();
        }
        
    }, 2000)
    

}

function cleanAreas () {
    firstname.value = '';
    lastname.value = '';
    email.value = '';

}