const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: String,
  description: String,
  content: String,
  urlToImage: String,
  language: String,
});

const userSchema = mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  token: String,
  favoriteArticles: [articleSchema],
  favoriteLanguage: String,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
