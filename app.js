const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const homeStartingContent = "Welcome to Blog Sphere, your ultimate destination for captivating stories, insightful articles, and a vibrant community of curious minds. Here, we dive into the latest trends, explore thought-provoking ideas, and share inspiring journeys that spark your imagination. Whether you're a passionate writer, an avid reader, or someone seeking a daily dose of creativity, Blog Sphere is where your curiosity comes to life. Join us in this ever-expanding universe of words and let’s make every moment a story worth telling!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Posts = mongoose.model("Post",blogSchema);


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", async (req, res) => {
  const posts = await Posts.find({});
  await res.render("home",{homeStartingContent:homeStartingContent, posts:posts});

})

app.get("/about", (req, res) => {
  res.render("about",{aboutContent:aboutContent})
})

app.get("/contact", (req, res) => {
  res.render("contact",{contactContent:contactContent})
})

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.post("/compose",async (req, res) => {
  const post = await new Posts({
    title: req.body.contentTitle,
    content: req.body.contentBody
  });
  await post.save();
  console.log("Saved")
  await res.redirect("/");
})


app.get("/posts/:postId",async (req, res) =>{
  const requestedPost = req.params.postId;
  const post = await Posts.findOne({_id:requestedPost})
  await res.render("post",{title:post.title, content:post.content})
});


mongoose.connect("mongodb+srv://shampooDove:blogSphere@blogsphere.bx5s8zd.mongodb.net/blogDB").then(()=>{
  let port = process.env.PORT;
  if (port == null || port === "") {
    port = 3000;
  }
  app.listen(port, function() {
    console.log("Server started");
  });
})
