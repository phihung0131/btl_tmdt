const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const passport = require("./src/config/passport");
const setupSwaggerDocs = require("./src/docs/api");
const routes = require("./src/routes");
const { connectionDatabase } = require("./src/config/database");
const { startCronJob } = require("./src/helper/cronJob");

const app = express();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 8081;

// Middleware: Enable CORS for specified origin
let corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Middleware: Parse requests with JSON payload
app.use(express.json());

// Middleware: Parse requests with x-www-form-urlencoded content type
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// Set EJS as the view engine
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Routes
app.use("/api/v1", routes);

// Route for the auth-redirect page
app.get("/auth-redirect", (req, res) => {
  const env = {
    HOSTNAME_FE: process.env.HOSTNAME_FE || "localhost",
  };
  res.render("auth-redirect", { env });
});

// API Document
setupSwaggerDocs(app, port);

// Connect to the database
connectionDatabase();

// Bắt đầu cron job
startCronJob();

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
