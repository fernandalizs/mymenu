import api from "./config.js"
import apiHelpers from "./helpers.js"

export default {
  whoami: () => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/accounts/whoami")
        .then((response) => {
          return resolve(response.data)
        })
        .catch((error) => {
          return reject(error)
        })
    })
  },
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      api
        .post("/api/accounts/login", apiHelpers.dataToForm({ email, password }))
        .then((response) => {
          return resolve(response.data)
        })
        .catch((error) => {
          return reject(error)
        })
    })
  },
  signup: (email, password) => {
    return new Promise((resolve, reject) => {
      api
        .post("/api/accounts/signup", apiHelpers.dataToForm({ email, password }))
        .then((response) => {
          console.log("API AUTH: SUCCESS");
          return resolve(response.data);
        })
        .catch((error) => {
          console.log("API AUTH: ERROR");
          return reject(error);
        });
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      api
        .post("/api/accounts/logout")
        .then((response) => {
          return resolve(response.data)
        })
        .catch((error) => {
          return reject(error)
        })
    })
  },
}
