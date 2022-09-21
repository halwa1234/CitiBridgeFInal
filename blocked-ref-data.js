const fs = require('fs');
const alphabets=new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");

function find(str){
    start=0;
    end=25;
    while(start<end){
        mid=Math.floor((start+end)/2);
        if(alphabets.at(mid)===str){
            return mid;
        } 
        else if(alphabets.at(mid)<str) start=mid+1;
        else end=mid;
    }
    return -1;
}

class trie{

    constructor(){
        this.arr= new Array(26);
        this.end=false;
    }

    insert(str){
        // let temp=this.arr.at(str.charAt(0)-'a');
        let temp=this.arr.at(find(str.charAt(0)));
        // console.log(find(str.charAt(0)));
        if(temp==null){
            this.arr[find(str.charAt(0))]= new trie();
        }
        if(str.length>1){
            // console.log("   Inserting ", str.substring(1));
            this.arr[find(str.charAt(0))].insert(str.substring(1));
        } 
        else{
            this.arr[find(str.charAt(0))].end=true;
        }
    }

    find(str){
        if(str.length==0){
            return this.end;
        }
        // console.log("   ",find(str.charAt(0)));
        let temp=this.arr.at(find(str.charAt(0)));
        if(this.arr[find(str.charAt(0))]==null) return false;
        else {
            // console.log(str.substring(1));
            return this.arr[find(str.charAt(0))].find(str.substring(1));
        }
    }
}

var list=new trie();
function check_block(str){
    return list.find(str);
}

function initList(filename){
    try {
        var data = fs.readFileSync(__dirname+'/data/'+filename, 'utf8');
        let names= data.trim().split('\n');
        for(const name of names){
            list.insert(name.trim());
        }
      } catch (err) {
        console.error(err);
      }
}

initList("blocked-names.txt");
exports.check_block=check_block;
// TESTING
// let tr= new trie();
const arr=["lily","v"];
for (const num of arr){
    console.log("Inserting ",num);
    console.log(list.find(num));
}

// console.log(tr.find("abc"));
// console.log(tr.find("abcd"));
// console.log(tr.find("a"));
// console.log(tr.find("bas"));
// console.log(tr.find(""));