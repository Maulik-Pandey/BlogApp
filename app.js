const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
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

mongoose.connect("mongodb://localhost:27017/blogDB").then(()=>{
  app.listen(3000, function() {
    console.log("Server started @ http://localhost:3000");
  });
})
