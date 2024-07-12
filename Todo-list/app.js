const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.get("/", function(req, res){
    var today = new Date();

    if (today.getDay() === 6 || today.getDay() === 0){
        res.write("Today is the weekend! Yay!")
    }else{
        res.sentFile(__dirname + "index.html")
    }
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})