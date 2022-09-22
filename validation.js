const { checkTranscID } = require("./transc-ref-data");

var pass = [];
var fail = [];

function validatedate(date){  
    var today = new Date();
  
    if(date.length!=8){
      return false;
    }
    
    if(today.getFullYear() === parseInt(date.substring(4),10) &&
        today.getMonth()+1 === parseInt(date.substring(2, 4),10)&&
        today.getDate() === parseInt(date.substring(0, 2),10) ){
            return true;
    }
    else{
      return false;
    }
}   

function doValidation(arr){

    for (let i = 0; i < arr.length; i++) {
      
        let flag=1;  
        if(arr[i]["date"].length!=8 || !validatedate(arr[i]["date"])){
          flag=0; //check date
        }
        else if( !(arr[i]["payeename"].length<36 &&  arr[i]["payername"].length<36 && arr[i]["payeeacc"].length == 12 && arr[i]["payeracc"].length == 12)){
          flag =0; //check lenghts of payee and payer details
        }
        else if(!arr[i]["payeename"].match(/^[0-9a-z/ ]+$/gi) || !arr[i]["payername"].match(/^[0-9a-z/ ]+$/gi) || !arr[i]["payeeacc"].match(/^[0-9a-z]+$/gi) || !arr[i]["payeracc"].match(/^[0-9a-z]+$/gi)){
            flag =0; //check alphanumeric characters for above
        }
        else if(arr[i]["amt"].length>14){
          flag=0; //check lenght for amount
        }
        else if(arr[i]["amt"].length<14){

          if(arr[i]["amt"].includes(".")){
            let value = arr[i]["amt"].split(".");
                if(value[0]?.length>10 || value[1]?.length!=2){
                    flag =0;
                }
                else{
                  if(!isNumeric(value[0]) || !isNumeric(value[1]) ){
                    flag =0;
                  }
                }
          }
          else{
            if(arr[i]["amt"].length>10 || !isNumeric(arr[i]["amt"]) ){
              flag =0;
            }
          }
            
            //check amount format.
        }
        else if (!checkTranscID(arr[i]["id"])){
          flag=0; //check id
        }
        
        //write to file
        if(flag==0){
          fail.push(arr[i]);
        }
        else{
          pass.push(arr[i]);
        }
    }

    //Check data
    // console.log("pass");
    // pass.forEach(function (e) {console.log(e)});
    // console.log("fail");
    // fail.forEach(function (e) {console.log(e)});
    saveJSON();
}

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function saveJSON(){
    var fs = require('fs');
    // var passjson = JSON.stringify(pass);
    // console.log("Validation Pass\n",pass);
    // fs.writeFile('data/validate-pass.json', passjson, 'utf8', function(err) {
    // if (err) throw err;
    // console.log('pass complete');
    // });
  
    // var failjson = JSON.stringify(fail);
    // console.log("Validation Fail\n",fail);
    // fs.writeFile('data/validate-fail.json', failjson, 'utf8', function(err) {
    // if (err) throw err;
    // console.log('fail complete');
    // });
    var passjson = JSON.stringify(pass);
    try {
      fs.writeFileSync('data/validate-pass.json', passjson);
    } catch (err) {
      console.error(err);
    }
  
    var failjson = JSON.stringify(fail);    
    try {
      fs.writeFileSync('data/validate-fail.json', failjson);
    } catch (err) {
      console.error(err);
    }
}

exports.doValidation=doValidation;

/*
var passjson = JSON.stringify(pass);
    try {
      fs.writeFileSync('data/validate-pass.json', passjson);
    } catch (err) {
      console.error(err);
    }
  
    var failjson = JSON.stringify(fail);    
    try {
      fs.writeFileSync('data/validate-fail.json', failjson);
    } catch (err) {
      console.error(err);
    }
*/