const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");
// const { join } = require('path/posix');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req,res){
    const Fname = req.body.fname;
    const Lname = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: Fname,
                    LNAME: Lname
                } 
            }
        ]
    };
    const jsonData = JSON.stringify(data);


    const url = "https://us5.api.mailchimp.com/3.0/lists/db734b68d6";
    const options ={
        method: "POST",
        auth: "Ziyad365:d6cb3ea80cfbea7e4a881523b088aa1d-us5"
    }
    const request = https.request(url, options, function(response){
        const code = response.statusCode;
        if(code == 200){
            res.sendFile(__dirname+"/sucess.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    })
    request.write(jsonData);
    request.end();
});
app.post("/failure", function(req,res){
    res.redirect("/");
});




























app.listen(process.env.PORT ||3000, function(){
    console.log("server is running @ port 3000");
});
// 8ba2b1854576bd8fbc511bf375f0503a-us5
// db734b68d6