const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileUpload');
const mysql = require('mysql');

const app = express();
const post = process.enc.PORT || 5000;

app.use(fileUpload());

app.use(express.static('public'));
app.use(express.static('upload'));

app.engine('hbs, exphbs({extname: *.hbs'}));
app.set('view engine', 'hbs');

const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'info'
});

pool.getConnection(err, connection) => {
    if(err) throw err;
    console.log('Connected');
});

app.get('', (req, res)) => {

});

pool.getConnection(err, connection) => {
    if(err) throw err;
    console.log('Connected');

    connection.query('UPDATE user SET image =? WHERE id = "1"', (UploadFile), (err, rows)) => {
        connection.release();

        if(err) {
            res.redirect('/');
        }else {
            console.log(err);
        }
       }

});

app.post(req, res) => {
    let UploadFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).send('No files were uploaded.');
    }

UploadFile = req.files.UploadFile;
uploadPath = __dirname + '/upload/' + UploadFile.name;

console.log(UploadFile);

UploadFile.mv()(uploadPath, function(err)) 
{
    if(err) return res.status(500).send(err);

    res.send('File uploaded');

}};


app.listen(port, ()=> console.log('Listening on port ${port}'));
