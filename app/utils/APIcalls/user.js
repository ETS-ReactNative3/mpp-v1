

export const UserLogin = (user) => {
    return fetch('/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user.profileObj)
    })
    .then((response) => {
    console.log(response);
    })
    .catch(error => {
    console.log(error);
    })
}