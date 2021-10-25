
export const GetDashboardInfo = () => {
    return fetch('/api/dashboard/dashboardInfo')
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