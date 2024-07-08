const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express(); 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.post("/", function(req, res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us22.api.mailchimp.com/3.0/lists/928ed58936";
    const options = {
        method: "POST",
        auth: "saima2:b885d35b3cee40a29a5bf7bf2e53ff31-us22"
    }
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

})

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
//928ed58936
//d4933ef2bd5ed8309af4186c434485fe-us22