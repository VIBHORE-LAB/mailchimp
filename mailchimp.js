const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const email = req.body.email;
  const firstname = req.body.fname;
  const lastname = req.body.lname;

  const data = {
    members: [
      {
        email_address: email,
        staus: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };

  const jsondata = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/a36c84283e";
  const options = {
    method: "POST",
    auth: "vibhore:3c8ddb63eb773b824bd39bbcc3e3e490-us21",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsondata);
  request.end();
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running at port 3000");
});

//3c8ddb63eb773b824bd39bbcc3e3e490-us21
//a36c84283e
