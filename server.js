const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Replace with your MongoDB Atlas URL)
mongoose.connect("your-mongodb-url", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Article Schema
const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
});

const Article = mongoose.model("Article", ArticleSchema);

// Routes
app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.post("/articles", async (req, res) => {
  const newArticle = new Article(req.body);
  await newArticle.save();
  res.status(201).json(newArticle);
});

app.post("/articles/:id/like", async (req, res) => {
  const article = await Article.findById(req.params.id);
  article.likes++;
  await article.save();
  res.json(article);
});

app.post("/articles/:id/dislike", async (req, res) => {
  const article = await Article.findById(req.params.id);
  article.dislikes++;
  await article.save();
  res.json(article);
});

app.listen(5000, () => console.log("Server running on port 5000"));
