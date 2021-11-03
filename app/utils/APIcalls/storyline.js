
export const GetStory = (id) => {
    return fetch(`/api/storyline/${id}`, {
      method: 'GET',
      headers: {
        'x-auth-token': authToken
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log(error)
    })
}

export const DeleteStory = (id) => {
    return fetch(`https://www.googleapis.com/drive/v2/files/${id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': authToken
      }
    })
    .then((response) =>{
      return response;
    })
    .catch((err) =>{
      console.log(err);
    })
}