const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "API_KEY";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        let data = '';

        // Aggregate data chunks
        response.on("data", function (chunk) {
            data += chunk;
        });

        // Handle the end of the response
        response.on("end", function () {
            if (response.statusCode === 200) {
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                res.write("<p>The weather is currently " + weatherDescription + "</p>");
                res.write("<h1>The temperature in " + query + " is " + temp + " degree Celsius</h1>");
                res.write("<img src=" + imageURL + " />");
                res.end();
            } else {
                res.write("<p>Error fetching weather data: " + response.statusCode + "</p>");
                res.write("<p>Message: " + JSON.parse(data).message + "</p>");
                res.end();
            }
        });
    }).on("error", function (e) {
        res.write("<p>Error: " + e.message + "</p>");
        res.end();
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
