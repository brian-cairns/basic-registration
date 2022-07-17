let login = document.getElementById('signIn')
login.addEventListener('click', () => {
    let userName = document.querySelector('input#clientUserName').value;
    let password = document.querySelector('input#clientPassword').value;
    console.log(userName, password)
    authorizeClient(userName, password)
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
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then((response) => {
      console.log(response)
      if (response.status == 200) {
      console.log('good')
      showSuccess(user)
      } else {
        showError()
      }
    })
    .catch((err) => showError(err))
}

function showSuccess(user) {
  document.getElementById('errorMessage').innerHTML = 'You have been successfully logged in. Routing you to your portal page'
  document.getElementById('errorMessage').style.display = "block";
  sessionStorage.setItem('userName', user)
  setTimeout(() => {location.href('/client-portal')}, 2000)
}

function showError() {
    document.getElementById('errorMessage').innerHTML = `Your password and username combination`
    document.getElementById('errorMessage').style.display = "block";
}