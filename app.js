const path = require('path')

const Datastore = require('nedb')
const db = new Datastore({ filename: './datastore.db', autoload: true });


require('dotenv').config();
console.log(process.env.API_KEY);

require("isomorphic-fetch");

// our server app
const express = require('express');
const app = express();
const port = 3000;

// using multer for fle upload
// const multer = require('multer')
// const upload = multer({ dest: './public/uploads/' })
const saveFile = require('./saveFile.js')

// this will allow our server to render HTML
app.set('view engine', 'ejs');
// setting our folder in which to put our EJS/HTML files
app.set('views', path.join(__dirname, 'views'));


// middleware for parsing application/json
app.use(express.json());

// middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// in middleware, the order matters...
// check the hour first!
// app.use(workingHours);
// serving our static files like always
app.use(express.static('public'));

// where we'll upload our form data
app.post("/thank-you", saveFile.single('image'), (req, res) => {
  if (req.body) {
      console.log(req.body, req.file)
  }

  // get the messy date and covert
  const newDate = friendlyDate(req.body.time)

  const doc = {
      name: req.body.name,
      contact: req.body.contact,
      time: newDate, // convert the date
      item: req.body.item,
      description: req.body.description,
      image: req.file
  };

  db.insert(doc, function (err, newDoc) {   
      if(err) {
          console.error("There is an Error saving to the database.")
      } else {
          console.log("Saved docs to database.", newDoc)
      }
  });

  const thankYou = path.join(__dirname, 'public/thank-you.html')
  res.sendFile(thankYou)
})


// route to get all the listings and render them using EJS
app.get('/listings', (req, res) => {
  console.log('getting listings')
  db.find({}, (err, docs) => {
      if (err) {
          // res.status(500).send('Error accessing database');
          console.log('There was an eror retrieving the database.')
      } else {
          console.log('Here are your docs.', docs)
          // render your EJS template with the entries
          // res.send('what do you want');
          res.render('listings', { listings: docs });
      }
  });
})

// hide my api key using npm package "isomorphic-fetch"
app.get('/weathercity', async (req, res) => {
    // const location = req.query.locationName;
    let majorCity = ['New York', 'London', 'Paris', 'Hongkong'];
    try {
        // 字符串,变量,字符串
        let baseUrl = 'http://api.weatherapi.com/v1/forecast.json?key='+ process.env.API_KEY +'&q='; // Replace with your actual base URL

        let urls = majorCity.map(city => {
            return baseUrl + encodeURIComponent(city) + '&days=1&aqi=yes&alerts=no';
        });

        console.log(urls);

        //要对数组所有的数据发起请求 .all 是promise的属性
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const jsonData = await Promise.all(responses.map(response => response.json()));

        // 一串字符串 用模版字符串连接 ${}写常量 = const let var 定义的东西/ .env文件里的东西
        // const response = await fetch(
        //     `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${location}&days=1&aqi=yes&alerts=no`
        // )
        //make the data from api into json form
        // const data = await response.json();
        res.json(jsonData);
    } catch {
        res.status(500).send("Error");
    }
});

app.get('/weather', async (req, res) => {
    const location = req.query.locationName;
    try {
        // fetch使用插件, 客户端和服务端所能使用的功能不同(使用插件从而使用fetch)
        const response = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${location}&days=1&aqi=yes&alerts=no`
        )
        //make the data from api into json form
        const data = await response.json();
        res.json(data);
    } catch {
        res.status(500).send("Error");
    }
});

// listen means the server is running
app.listen(port, () => console.log(`Server listening here: http://localhost:${port}`))

// makes the date from the form more readable
function friendlyDate(theDate) {
  // Convert the date to a more readable format and round to the nearest half hour
  const date = new Date(theDate);
  date.setMinutes(Math.round(date.getMinutes() / 30) * 30);
  const dateString = date.toLocaleString('en-US', {
      weekday: 'short', // "Thu"
      month: 'short',   // "Dec"
      day: 'numeric',   // "14"
      hour: 'numeric',  // "12 PM"
      minute: 'numeric',
      hour12: true
  });
  return dateString;
}






// app.get('/', (req, res) => {
//   res.render('index', {
//     API_KEY: process.env.API_KEY // Pass environment variables to the HTML template
//   });
// });

// app.listen(port, () => {
//   console.log('Server listening at http://localhost:3000');
// });

// our custom middleware function
// function workingHours(req, res, next) {

//   // get the current time
//   const currentTime = new Date();
//   // get the hour
//   const currentHour = currentTime.getHours();

//   const normalBusinessHours = {
//     // 24 hour time
//     open: 9,
//     close: 17,
//   };

//   // check if within normal business hours
//   if (
//     currentHour >= normalBusinessHours.open &&
//     currentHour <= normalBusinessHours.close
//   ) {

//     // if so, point the request to our static files
//     console.log('Open!');
//     req.url = 'index.html';
//     // req.url = 'chauncey-gardiner-resume.pdf';
//     next();

//   } else {
    
//     // otherwise, return the denial
//     console.log('Closed 🔒 -- Normal BusinessHour 9 - 17 -- Come back another time');
//     req.url = 'chauncey-gardiner-resume.pdf';
//     // req.url = 'denied.html';
//     next();

//   }
  
// }
