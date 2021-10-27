export const GetStory = id =>
  fetch(`/api/storyline/${id}`)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      console.log(error);
    });

export const DeleteStory = id =>
  fetch(`https://www.googleapis.com/drive/v2/files/${id}`)
    .then(response => response)
    .catch(err => {
      console.log(err);
    });
