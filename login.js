let login = document.getElementById('signIn')
login.addEventListener('click', () => {
    let userName = document.querySelector('input#clientUserName').value;
    let password = document.querySelector('input#clientPassword')
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
    method: "get",
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
    document.getElementById('returnMessage').innerHTML = 'You have been successfully logged in. Routing you to your portal page'
}

function showError(err) {
    console.error
    document.getElementById('errorMessage').style.display = inline;
}
