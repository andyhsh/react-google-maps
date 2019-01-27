const baseUrl = `http://localhost:8080`;
const delay = 1000;

class MockApi {
  static submitData(payload) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/route`, { method: 'POST', body: payload })
        .then(response => {
          if (response.status == 500 || !response.ok) {
            throw Error(response);
          }

          return response.json();
        })
        .then(json => {
          resolve(json.token);
        })
        .catch(error => {
          return setTimeout(() => {
            MockApi.submitData(payload).then(resolve);
          }, delay);
        });
    });
  }
}

export default MockApi;
