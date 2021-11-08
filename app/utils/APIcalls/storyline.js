
export const GetStory = async (id) => {
    return await fetch(`/api/storyline/${id}`, {
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

export const CreateStory = async (story,authToken) => {
    return await fetch('/api/storyline/new', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': authToken
      },
      body: JSON.stringify({
          'logline': {
            'crisis': story.logline.crisis,
            'response': story.logline.response,
        },
          'theme': story.theme,
          'genre': story.genre,
          'subGenre': story.subGenre,
          'title': story.title,
        })
      })
      .then(function(response) {
          //console.log(response);
          return response;
      })
      .catch((err)=>{
        console.log(err);
        return err;
      })
}

export const UpdateStory = async (story,id,authToken) => {
    return await fetch(`/api/storyline/${id}`, {
      method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': authToken
      },
      body: JSON.stringify({
          'logline': {
            'crisis': story.logline.crisis,
            'response': story.logline.response,
        },
          'theme': story.theme,
          'genre': story.genre,
          'subGenre': story.subGenre,
          'title': story.title,
        })
      })
    .then(function(response) {
          //console.log(response);
          return response;
    })
    .catch((err)=>{
      console.log(err);
      return err;
    })
}

export const DeleteStory = async (id,authToken) => {
    return await fetch(`/api/storyline/${id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': authToken
      }
    })
    .then((response) =>{
      console.log(response);
      return response;
    })
    .catch((err) =>{
      console.log(err.response);
      console.log(err);
    })
}