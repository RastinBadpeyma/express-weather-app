const express = require("express");
const port  = 3000;
const axios = require("axios");
const app = express();

//Serve the public folder as static files
app.use(express.static("public"));

// Set the view engine to EJS
app.set('view engine' , "ejs");

// Render the index template with default values for weather and error
app.get('/' , (req , res) => {
return res.render("index" , {weather : null , error : null});
});
// Handle the weather route
app.get('/weather' , async (req , res) => {
   const city = req.query.city;
   const apiKey = "31c0cf14a72fc14583fc38fb920542a6";

   //Add the logic to fetch weather data from the API
   const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
   let weather;
   let error = null;
   try {
      const response = await axios.get(APIUrl);
      weather = response.data;
   } catch (err) {
      weather  = null;
      error = "Not Found,Please try again";
   }
     // Render the index template with the weather data and error message
  res.render("index", { weather, error });
});






app.listen(port , ()=>{
console.log(`App is running on port ${port}`);
});