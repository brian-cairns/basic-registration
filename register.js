let firstReg = document.getElementById('firstRegisterButton')

firstReg.addEventListener('click', () => {
	document.getElementById('loginInputs').style.display = 'none'
  document.getElementById('loginSection').style.display = 'none'
  document.getElementById('registrationSection').style.display = 'block'
  })


let registration = document.getElementById('registration')
registration.addEventListener('click', () => {
    let password = document.querySelector('input#registrationPassword').value
    console.log(password)
    let passwordCheck = document.querySelector('input#passwordCheck').value
    console.log(passwordCheck)
    let userName = document.querySelector('input#registrationUserName').value
    console.log(userName)
  password === passwordCheck ? registerUser(userName, password) : showError()
  document.getElementById('waitingRegister').style.display = 'block'
})

function showError() {
  document.getElementById('errorMessage').style.display = 'block';
  document.getElementById('waitingRegister').style.display = 'none';
  document.querySelector('input#registrationPassword') = '';
	document.querySelector('input#passwordCheck') = '';
    
}

async function registerUser(user, password) {
  const document = {
    'userName': user,
    'password': password
  }
  console.log(`I am the document: ${document}`)
  fetch('https://pffm.azurewebsites.net/registration', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then((response) => response.json)
    .then((data) => {
      console.log(data)
      if (response.status != 500 || response.status != 403 || response.status != 404) {
      showRegistrationSuccess()} else {
        showError(response.statusText)
      }
      sessionStorage.setItem('OAuthKey', data.key)
    })
    .catch((err) => showRegError(err))
}


function showRegistrationSuccess() {
  document.getElementById('waitingRegister').style.display = 'none'
  document.getElementById('returnMessage').innerHTML = 'You have been successfully registered & will be redirected to client intake'
  document.getElementById('returnMessage').style.display = 'block'
  setTimeout(() => { location.href = './forms/pffm-inc-contact-information' }, 4000)
  
}

function showRegError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
    document.getElementById('returnMessage').style.display = 'block'
}
