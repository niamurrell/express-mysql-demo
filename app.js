var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host: "localhost",
    user: "niamurrell",
    database: "join_us"
});

app.get("/", function(req, res) {
    var q = "SELECT COUNT(*) AS count FROM users";

    connection.query(q, function (error, results) {
      if (error) throw error;
      var count = results[0].count;
      res.render("home", {count: count});
    });
});

app.post("/register", function(req, res) {
    // This is not best practices:
    
    // var email = req.body.email;
    // var q = "INSERT INTO users (email) VALUES ('" + email + "')";
    
    // connection.query(q, function(error, results) {
    //     if (error) throw error;
    //     res.redirect("/");
    // });
    
    // Instead use the best practice for INSERT:
    
    var person = {
        email: req.body.email
    };
    
    connection.query("INSERT INTO users SET ?", person, function(error, results) {
        if (error) throw error;
        res.redirect("/");
    });
});

app.listen(process.env.PORT || 8080, function() {
    console.log("App is listening on " + process.env.PORT);
});