const express = require('express');

const app = express();

// Assets directories
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('views'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("*", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/auth", function (request, response){
  response.send({token: "198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f"});
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('App is listening on port ' + listener.address().port);
});

