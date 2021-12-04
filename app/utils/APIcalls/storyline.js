export const GetStory = async (id,authToken) =>{
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token",authToken);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    return await fetch(`/api/storyline/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => { return result.response;})
      .catch(error => {console.log('error', error); return error;});
}


export const getParamsID = n => window.location.href.split('/')[n];

export const CreateStory = async (story, authToken) =>
  await fetch('/api/storyline/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': authToken,
    },
    body: JSON.stringify({
      logline: {
        crisis: story.logline.crisis,
        response: story.logline.response,
      },
      theme: story.theme,
      genre: story.genre,
      subGenre: story.subGenre,
      title: story.title,
    }),
  })
    .then(function(response) {
      // console.log(response);
      return response;
    })
    .catch(err => {
      console.log(err);
      return err;
    });

export const UpdateStory = async (story, id, authToken) =>
  await fetch(`/api/storyline/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': authToken,
    },
    body: JSON.stringify({
      logline: {
        crisis: story.logline.crisis,
        response: story.logline.response,
      },
      theme: story.theme,
      genre: story.genre,
      subGenre: story.subGenre,
      title: story.title,
    }),
  })
    .then(function(response) {
      // console.log(response);
      return response;
    })
    .catch(err => {
      console.log(err);
      return err;
    });

export const DeleteStory = async (id, authToken) =>
  await fetch(`/api/storyline/${id}`, {
    method: 'DELETE',
    headers: {
      'x-auth-token': authToken,
    },
  })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(err => {
      console.log(err.response);
      console.log(err);
      return err;
    });
