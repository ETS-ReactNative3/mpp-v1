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

async function refreshToken(){
  try {
    await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST', 
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: 'refresh_token',
      })
      })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch((error) => {
        return null;
      });
    
  } catch (error) {
    return null;
  }
}

const getValidTokens = async (tokens) => {
  let isTokenExpired = false;
  if(!tokens) return null;
  await fetch( `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${tokens.access_token}`,{method: 'POST'})
  .then((response) => {
    if(response.status === 200) {
      return tokens;
    }
    else{
      isTokenExpired = true;
    }
  })
  .catch((err) => {
    console.log(err);
    return null;
  })

  const newTokens = await refreshToken();
  console.log(newTokens); 
  return newTokens;
}

module.exports = { getListOfFiles,getValidTokens };
