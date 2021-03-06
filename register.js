let registration = document.getElementById('registration')
registration.addEventListener('click', () => {
    let password = document.querySelector('input#registrationPassword').value
    console.log(password)
    let passwordCheck = document.querySelector('input#passwordCheck').value
    console.log(passwordCheck)
    let userName = document.querySelector('input#registrationUserName').value
    console.log(userName)
    password === passwordCheck ? registerUser(userName, password) : showError()
})

function showError() {
  document.getElementById('errorMessage').style.display = inline;
  document.querySelector('input#registrationPassword') = '';
	document.querySelector('input#passwordCheck') = '';
    
}

async function registerUser(user, password) {
  const document = {
    'userName': user,
    'password': password
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/registration', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then((response) => {
      if (response.status == 200) {
      showSuccess()
      } else {
        showError(response.body)
      }
    })
    .catch((err) => showError(err))
}


function showSuccess() {
  document.getElementById('returnMessage').innerHTML = 'You have been successfully registered & will be redirected to client intake'
  setTimeout (() => {location.href('./forms/new-client-intake-form')}, 2000)
  
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}

