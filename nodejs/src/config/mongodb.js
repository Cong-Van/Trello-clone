const mongoose = require("mongoose");
const env = require("./environment");

async function connect() {
  try {
    await mongoose.connect(`${env.MONGODB_LOCALHOST}/${env.DATABASE_NAME}`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Connect failure", err);
  }
}

module.exports = { connect };
