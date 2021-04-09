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

function makePersonTransactions(event) {
    //console.log(event.target);
    if (event.target.classList.contains('btn--delete')) {
        const deleteTr = event.target.parentElement.parentElement;
        const deleteMail = event.target.parentElement.previousElementSibling.textContent
        guideDelete(deleteTr, deleteMail);
        //console.log('Delete');
    } else if (event.target.classList.contains('btn--edit')) {
        console.log('Update');
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

    const addPerson = {
        firstname : firstname.value,
        lastname : lastname.value,
        email : email.value,
    }
    const result = dataCheck(addPerson);
    if (result.statu) {
        personToAdd(addPerson);
    } else {
        infoCreate(result.message, result.statu);
    }

    //console.log(addPerson);
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