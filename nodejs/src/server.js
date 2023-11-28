const express = require("express");
const cors = require("cors");
const corsOption = require("./config/cors");

const env = require("../src/config/environment");
const route = require("./routes");
const db = require("./config/mongodb");

// Connect DB
db.connect(corsOption);

const app = express();

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route(app);

app.listen(env.APP_PORT, env.APP_HOST, () =>
  console.log(`Server started on port http://localhost:${env.APP_PORT}`)
);
