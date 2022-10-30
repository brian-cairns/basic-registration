let login = document.getElementById('login')

login.addEventListener('click', () => {
    let userName = document.querySelector('input#clientUserName').value;
    let password = document.querySelector('input#clientPassword').value;
    console.log(userName, password)
    authorizeClient(userName, password)
    showWaiting()
})

async function authorizeClient(user, password) {
  const document = {
    'userName': user,
    'password': password
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(document)
  })
    .then((response) => response.json)
    .then((data) => {
      console.log(data)
      if (response.status != 500 || response.status != 403 || response.status != 404) {
        showRegistrationSuccess()
      } else {
        showError(response.statusText)
      }
      sessionStorage.setItem('OAuthKey', data.key)
    })
    .catch((err) => showRegError(err))
}
  
function showSuccess(user) {
  document.getElementById('waitingRegister').style.display = 'none';
  document.getElementById('returnMessage').innerHTML = 'You have been successfully logged in. Routing you to your portal page'
  document.getElementById('returnMessage').style.display = "block";
  sessionStorage.setItem('userName', user)
  setTimeout(() => {location.href='./client-portal'}, 2000)
}

function showError() {
  document.getElementById('waitingRegister').style.display = 'none';
  document.getElementById('returnMessage').innerHTML = `Your password and username combination are not valid`
  document.getElementById('returnMessage').style.display = "block";
  document.getElementById('resetPassword').style.display = 'block';
}

function showWaiting() {
  document.getElementById('waitingLogin').style.display = 'block';
  document.getElementById('resetPassword').style.display = 'none';
}
