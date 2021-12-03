export const GetDashboardInfo = authToken => {
  return fetch('/api/dashboard/dashboardInfo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': authToken,
    },
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      return json;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const linkDrive = authToken => {
  return fetch('/api/google/linkDrive', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': authToken,
    },
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(res) {
      console.log(res);
      window.open(`${res.url}`);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
