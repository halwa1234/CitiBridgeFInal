const {screen}=require("./screening.js");
const {doValidation}=require("./validation.js");
const express=require("express");
const app= express();
const fs = require('fs');

const password="asdf";
app.use(express.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var arr="";
function loadFile(filename){
    try{
        arr=fs.readFileSync(__dirname+"/data/"+filename, "utf-8");
        
    }
    catch(err){
        console.log(err);
    }
    return arr;
}

app.post('/api/store', (req, res) => {
    doValidation(req.body);
    screen();

   // res.send("OK");
    var all = JSON.stringify(req.body);    
    try {
      fs.writeFileSync('data/all.json', all);
    } catch (err) {
      console.error(err);
    }

});

app.get('/api/validate-fail/', (req, res) => {
    
    res.send(loadFile("validate-fail.json"));
    
});

app.get('/api/validate-pass', (req, res) => {
    
    res.send(loadFile("validate-pass.json"));
    

});

app.get('/api/screen-pass', (req, res) => {
    res.send(loadFile("screen-pass.json"));    
});

app.get('/api/screen-fail', (req, res) => {
    res.send(loadFile("screen-fail.json"));    
});

app.get('/api/all', (req, res) => {
    res.send(loadFile("all.json"));    
});


app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}... `));