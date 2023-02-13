//jshint esversion: 6

const express = require("express")
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    var firstName = req.body.firstName
    var secondName = req.body.secondName
    var email = req.body.email
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    const url = "//your mailchimp api"
    const options = {
        method: "POST",
        auth: "<username>:key"
    }
    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.listen(3000,function(){
    console.log("server is running at port 3000, oh yeah")
})

// api key :- 7e014c73ed2445d8a6621f5a1dfa9d9d-us21
// list id :- 41a129d14c