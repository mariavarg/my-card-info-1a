const express = require('express');
const exphbs = require('express-handlebars'); // updated to 6.0.X
const fileUpload = require('express-fileupload');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

// default option
app.use(fileUpload());

// Static Files
app.use(express.static('public'));
app.use(express.static('upload'));

// Templating engine
// app.engine('hbs', exphbs({ extname: '.hbs' })); // v5.3.4
// app.set('view engine', 'hbs'); // v5.3.4

// Update to 6.0.X
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');


// Connection Pool
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'userprofile'
});


app.get('', (req, res) => {
    connection.query('SELECT * FROM user WHERE id = "1"', (err, rows) => {
      if (!err) {
        res.render('index', { rows });
      }
    });
});


app.post('', (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/upload/' + sampleFile.name;

  console.log(sampleFile);

  // Use mv() to place file on the server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

      connection.query('UPDATE user SET profile_image = ? WHERE id ="1"', [sampleFile.name], (err, rows) => {
        if (!err) {
          res.redirect('/');
        } else {
          console.log(err);
        }
      });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));