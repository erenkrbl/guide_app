// Let's choose interface

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');

const form = document.getElementById('form-guide');

// event listeners define

form.addEventListener('submit', Submit);

function Submit(e) {
    e.preventDefault();

    const addPerson = {
        firstname : firstname.value,
        lastname : lastname.value,
        email : email.value,
    }
    const result = dataCheck(addPerson);
    if (result.statu) {
        infoCreate(result.message, result.statu);

    } else {
        infoCreate(result.message, result.statu);
        console.log(result.message);
    }

    console.log(addPerson);
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