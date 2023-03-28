const data = require("../data");
const crypto = require("node:crypto");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getUser(email) {
  const user = data.users.find((user) => user.email === email);
  if (!user) {
    console.log("login invalido: ", email);
    return;
  }
  return user;
}

function getUserBySessionId(sessionid) {
  const user = data.users.find((user) => user.sessionid === sessionid);
  if (!user) {
    console.log("session not found: ", sessionid);
    return;
  }
  return user;
}

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;
    sleep(800).then(() => {
      let user = getUser(email);
      if (!user || !password) {
        console.log("3");
        res.status(200).end();
        return;
      }
      user.sessionid = crypto.randomUUID();
      res.cookie("sessionid", user.sessionid, { httpOnly: true }).send({
        user: user,
        authenticated: true,
      });
    });
  },
  signup: (req, res) => {
    const { email, password } = req.body;
    sleep(800).then(() => {
      let user = getUser(email);
      if (!user || !password) {
        console.log("3");
        res.status(200).end();
        return;
      }
      user.sessionid = crypto.randomUUID();
      res.cookie("sessionid", user.sessionid, { httpOnly: true }).send({
        user: user,
        authenticated: true,
      });
    });
  },
  whoami: (req, res) => {
    let user;
    const sessionid = req.cookies.sessionid;
    if (sessionid) {
      user = getUserBySessionId(sessionid);
    }
    let response = {
      authenticated: false,
    };
    if (user) {
      response = {
        user: user,
        authenticated: true,
      };
    }
    res.send(response);
  },
  logout: (req, res) => {
    console.log("logout...");
    res.clearCookie("sessionid").send({
      authenticated: false,
    });
  },
  loginRequired: (req, res) => {
    let loggedUser;
    const sessionid = req.cookies.sessionid;
    if (sessionid) {
      loggedUser = getUserBySessionId(sessionid);
    }

    if (!loggedUser) {
      res.status(401).end("Header not found");
      return false;
    }
    return loggedUser;
  },
};
