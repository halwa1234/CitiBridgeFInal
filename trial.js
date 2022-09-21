const alphabets=new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");

function find(str){
    start=0;
    end=25;
    while(start<end){
        mid=Math.floor((start+end)/2);
        console.log(mid);
        if(alphabets.at(mid)===str){
            
            return mid;
        } 
        else if(alphabets.at(mid)<str) start=mid+1;
        else end=mid;
    }
    return -1;
}

console.log(find("b"));
