require("dotenv").config();
const express = require("express");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const authController = require("./controller/auth-controller");
const historyController = require("./controller/history-controller");
const favController = require("./controller/fav-controller");
const userController = require("./controller/user-controller");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set("view engine", "handlebars");

app.use(authController);
app.use(historyController);
app.use(favController);
app.use(userController);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
const startServer = async () => {
  await db.sequelize.sync(syncOptions);

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
  });
};

startServer();
