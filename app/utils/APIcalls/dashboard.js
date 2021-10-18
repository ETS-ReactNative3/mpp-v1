
export const GetDashboardInfo = () => {
    return fetch('http://localhost:5000/api/dashboard/dashboardInfo')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
        return json;
    })
    .catch(err => {
      console.log(err);
    });
} 