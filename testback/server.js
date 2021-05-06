const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./database.json");
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

function userInfoFind(email) {
  return userdb.users.filter((user) => user.email === email);
}

function isPassword({ id, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.id === id && user.password === password
    ) !== -1
  );
}

// Register New User
server.post("/auth/register", (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { email, password, name } = req.body;

  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = "Email and Password already exist";
    res.status(status).json(`[${status}]${message}`);
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json(`[${status}]${message}`);
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({
      id: last_item_id + 1,
      email: email,
      password: password,
      name: name,
    }); //add some data
    var writeData = fs.writeFile(
      "./users.json",
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json(`[${status}]${message}`);
          return;
        }
      }
    );
  });

  // Create token for new user
  const access_token = createToken({ email, password, name });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

// Login to one of the users from ./users.json
server.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json(`[${status}]${message}`);
    return;
  }
  const userInfo = userInfoFind(email);
  const { userEmail = email, name, id } = userInfo[0];
  const access_token = createToken({ email, password });
  console.log("Access Token:" + access_token);
  res.cookie("access_token", access_token, { httpOnly: true, secure: true });
  res.status(200).json({ access_token, userEmail, name, id });
});

/**
 *  유저정보수정시 비밀번호가 일치하면 수정할 수 있도록 구현
 */
server.post("/auth/update", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { id, password } = req.body;
  if (isPassword({ id, password }) === false) {
    const status = 401;
    const message = "Incorrect password";
    res.status(status).json(`[${status}]${message}`);
    return;
  }
  res.status(200).json("success");
});

server.get("/auth/logout", (req, res) => {
  res.clearCookie("access_token");
  console.log("logout");
  res.status(200).json("logout success");
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json(`[${status}]${message}`);
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json(`[${status}]${message}`);
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json(`[${status}]${message}`);
  }
});

server.use(router);

server.listen(8000, () => {
  console.log("Run Auth API Server");
});
