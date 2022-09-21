const {check_block}=require('./blocked-ref-data');
const fs = require('fs');

var arr=[];
var pass = [];
var fail = [];

function loadFile(){
    try{
        let data=fs.readFileSync(__dirname+"/data/validate-pass.json", "utf-8");
        arr=JSON.parse(data);
    }
    catch(err){
        console.log(err);
    }
}

function saveJSON(){
    var fs = require('fs');
    var passjson = JSON.stringify(pass);
    fs.writeFile('data/screen-pass.json', passjson, 'utf8', function(err) {
    if (err) throw err;
    });
  
    var failjson = JSON.stringify(fail);
    fs.writeFile('data/screen-fail.json', failjson, 'utf8', function(err) {
    if (err) throw err;
    });
}

function screen(){
    loadFile();
    for(const el of arr){
        if(check_block(el["payeename"]) || check_block(el["payername"])){
            fail.push(el);
        }
        else pass.push(el);
    }
    saveJSON();
}

exports.screen=screen;
