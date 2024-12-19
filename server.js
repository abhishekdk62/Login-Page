const express = require("express");
const session = require("express-session");
const nocache = require("nocache");
const app = express();

app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "hbs");
app.use(express.json());

app.use(nocache());

let passwrong = false;

const username = "abhishek";
const password = "brototype";

app.get("/", (req, res) => {
  if (req.session.user) {
    passwrong = false;
    res.render("home");
  } else if (passwrong == true) {
    res.render("login", { msg: "invalid credentials" });
  } else {
    res.render("login");
  }
});

app.post("/verify", (req, res) => {
  if (req.body.username == username && req.body.password == password) {
    req.session.user = req.body.username;
    res.redirect("/");
  } else {
    passwrong = true;
    res.redirect("/");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/"); // Redirect to the login page (GET request) after logout
  });
});

app.get("*",(req,res)=>{
  res.status(404);
  res.send("404 not found");
})

const port = 3010;
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
