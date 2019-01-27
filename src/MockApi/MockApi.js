const baseUrl = `http://localhost:8080`;
const delay = 1000;

class MockApi {
  static submitData(payload, retryCount = 5) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/route`, { method: 'POST', body: JSON.stringify(payload) })
        .then(response => {
          if (response.status === 500 || !response.ok) {
            throw Error(response.status);
          }

          return response.json();
        })
        .then(json => {
          resolve(json);
        })
        .catch(error => {
          if (!retryCount) throw error;

          return setTimeout(() => {
            resolve(MockApi.submitData(payload, --retryCount));
          }, delay);
        });
    });
  }

  static getRoute(token, retryCount = 5) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/route/${token}`)
        .then(response => {
          if (response.status === 500 || !response.ok) {
            throw Error(response.status);
          }

          return response.json();
        })
        .then(json => {
          if (json.status === 'in progress') {
            throw Error(json.status);
          }

          if (json.status === 'failure') {
            reject(json);
            return;
          }

          resolve(json);
        })
        .catch(error => {
          if (!retryCount) throw error;

          return setTimeout(() => {
            resolve(MockApi.getRoute(token, --retryCount))
          }, delay);
        });
    });
  }
}

export default MockApi;
