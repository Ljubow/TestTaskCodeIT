// 'use strict';

let form = document.getElementById('form');

function showError(container, errorMessage, check) {
    if(check){
        container.className = 'form-group form-check';
    }
    else {
    container.className = 'form-group input-group error';
    }
    let msgElem = document.createElement('small');
    msgElem.className = "input-group error-message";
    msgElem.style.color = 'grey';
    msgElem.innerHTML = errorMessage;
    container.appendChild(msgElem);
}

function resetError(container,check) {
    if (check) {
        container.className = 'form-group form-check';
    } else {
        container.className = 'form-group input-group'
    }
    if (container.lastChild.className == "input-group error-message") {
        container.removeChild(container.lastChild);
    }
}

function validate(form) {
    let elems = form.elements;
    for (let i = 0; i < elems.length - 1; i++) {
        resetError(elems[i].parentNode, false);
        if (!elems[i].value) {
            showError(elems[i].parentNode, 'This field must not be empty', false);
        }
    }
    // resetError(elems.name.parentNode);
    let regexp2 = /\w{3,60}/;
    if (elems.name.value && !regexp2.test(elems.name.value)) {
        showError(elems.name.parentNode, 'Name should contain from 3 to 60 letters', false);
    }
    // resetError(elems.secondname.parentNode);
    let regexp3 = /\w{3,60}/;
    if (elems.secondname.value && !regexp3.test(elems.secondname.value)) {
        showError(elems.secondname.parentNode, 'Second Name should contain from 3 to 60 letters', false);
    }
    // resetError(elems.pass.parentNode);
    let regexp1 = /[\w\d]{6,60}/;
    if (elems.pass.value && !regexp1.test(elems.pass.value)) {
        showError(elems.pass.parentNode, 'Password should contain from 6 to 60 symbols', false);
    }
    // resetError(elems.email.parentNode);
    let regexp = /^[\w-\.]+@[\w-]+\.\w{2,}$/i;
    if (elems.email.value && !regexp.test(elems.email.value)) {
        showError(elems.email.parentNode, 'Email is not valid', false);
    }
    resetError(elems.gender.parentNode, false);
    if (!elems.gender.value || elems.gender.value == "1") {
        showError(elems.gender.parentNode, 'Choose your gender', false);
    }
    resetError(elems.check.parentNode, true);
    if (!elems.check.checked) {
        showError(elems.check.parentNode, 'You must agree before submitting', true);
    }
}

form.addEventListener('submit', postData);

function postData(event) {
    event.preventDefault();

    let fName = document.getElementById('fName');
    let sName = document.getElementById('sName');
    let usrEmail = document.getElementById('usrEmail');
    let usrPass = document.getElementById('usrPass');
    let gender = document.getElementById('gender');

    var data = new FormData(this);
    data.append(fName.value, fName);
    data.append(sName.value, sName);
    data.append(usrEmail.value, usrEmail);
    data.append(usrPass.value, usrPass);
    data.append(gender.value, gender);

    fetch('http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration', {
            method: 'POST',
            body: data

        }).then((res) => res.json())
        .then((data) => {
            if(data.status === "OK"){
                console.log(data);
                document.location.href = "companies/index.html";
            }
        })
        .catch((err) => console.log(err));
    }