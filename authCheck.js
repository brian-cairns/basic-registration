const authLevel = sessionStorage.getItem('pageAuth')
const OAuthKey = sessionStorage.getItem('OAuthKey')
const user = OAuthKey.endsWith('-U')
const staff = OAuthKey.endsWith('-ST')
const admin = OAuthKey.endsWith('-AD')

if (authLevel == 'Admin' && !admin) { reject() }
if (authLevel == 'Staff' && !admin) {
    if(!staff) {reject()}
}
if (authLevel == 'User' && !user) {
    if (!staff && !admin) { reject ()}
}

function reject() {
    location.href('./403')
}