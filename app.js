const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https")


const app = express();

app.use(express.static("Public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fiels: {
          FANME: firstName,
          LANME: lastName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/9e3aaf2183";

  const options = {
    method: "POST",
    auth: "tohid:25fee344bd70bda1ff9927b06c179175-us21"

  }
  const request = https.request(url,options,function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html" );
    } else {
      res.sendFile(__dirname + "/failure.html" );
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/")
});
app.listen(process.env.PORT ||3000,function(){
  console.log("server is running on port 3000");
})

// API KEY
// 25fee344bd70bda1ff9927b06c179175-us21

// LIST ID
// 9e3aaf2183
