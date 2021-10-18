
export const GetStory = (id) => {
    return fetch(`http://localhost:5000/api/storyline/${id}`)
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
    return fetch(`https://www.googleapis.com/drive/v2/files/${id}`)
    .then((response) =>{
      return response;
    })
    .catch((err) =>{
      console.log(err);
    })
}