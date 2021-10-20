const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getListOfFiles = async (list, access_token) => {
  const arr = [];
  if (!list) {
    return null;
  }
  for (let i = 0; i < list.length; i++) {
    await fetch(`${list[i].childLink}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${access_token}`,
      },
    })
      .then(result => result.json())
      .then(response => {
        arr.push(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return arr;
};

const getValidTokens = async (tokens) => {
  if(!tokens) return null;
  await fetch( `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${tokens.access_token}`,{method: 'POST'})
  .then((response) => {
    if(response.status === 200) {
      return tokens;
    }
    else{

    }
  })
  .catch((err) => {
    console.log(err);
    return null;
  })
}

module.exports = { getListOfFiles,getValidTokens };
