
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const getListOfFiles = async (list,access_token) => {
    for (let i = 0; i < list.length; i++) {   
        await fetch(`${list[i].childLink}`, {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + `${access_token}` },
        })
        .then((result) => {
            return result.json()
        })
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

module.exports = {getListOfFiles};
