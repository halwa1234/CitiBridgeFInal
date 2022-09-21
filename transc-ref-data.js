/*
    `new avlTree(new node(int rootNodeVal))'
        - to create new tree
    `insert(new node(int newNodeVal))`
        - to insert new node
        - returns true if inserted (if no duplicate exists)
        - and false when not inserted.
*/


class node{
    constructor(data){
        this.data=data;
        this.left=null;
        this.right=null;
        this.parent=null;
        this.h=0;
    }

    leftRotate(){
        // console.log("Left rotate at- ", this.data);
        let temp= this.right;
        if(this.parent!=null){
            if(this.parent.left==this) this.parent.left=temp;
            else this.parent.right=temp;
        }

        this.right=temp.left;
        temp.left=this;
        
        temp.parent=null;
        this.parent=temp;
        if(this.left!=null) this.left.parent=this;

        this.h=this.calcH();
        temp.h=temp.calcH();
        return temp;
    }

    rightRotate(){
        // console.log("Right rotate at- ", this.data);
        let temp=this.left;
        if(this.parent!=null){
            if(this.parent.left==this) this.parent.left=temp;
            else this.parent.right=temp;
        }

        this.left=temp.right;
        temp.right=this;

        temp.parent=this.parent;
        this.parent=temp;
        if(this.left!=null) this.right.parent=this;

        this.h=this.calcH();
        temp.h=temp.calcH();
        return temp;
    }

    calcH(){
        if(this.left==null && this.right==null) return 0;
        if(this.left==null) return this.right.h+1;
        if(this.right==null) return this.left.h+1;
        return Math.max(this.left.h, this.right.h)+1;
    }


}

class avlTree{
    constructor(){
    }

    print(){
        
    }

    traverse(root){
        if(root==null) return;
        if(root.h==0) console.log(root.data)
        if(root.h>0){
            console.log(root.data);
            this.traverse(root.left);
            this.traverse(root.right);
        }
    }

    insert(now){
        if(this.root==null){
            this.root=now;
            return true;
        }
        this.len++;
        let ptr=this.root;
        while(true){
            // console.log(ptr.data);
            if(now.data>ptr.data){
                if(ptr.right==null){
                    // console.log("added ", now.data);
                    ptr.right=now;
                    now.parent=ptr;
                    break;
                }
                ptr=ptr.right;
            }
            else if(now.data<ptr.data){
                if(ptr.left==null){
                    ptr.left=now;
                    now.parent=ptr;
                    break;
                }
                ptr=ptr.left;
            }
            else return false;
        }

        while(ptr!=null){
            //if ptr's height has changed
            
            if(ptr.h!=ptr.calcH()){
                ptr.h=ptr.calcH();
                // console.log("   checking balance ", ptr.h, "  ", ptr.data);
                if(ptr.h>=2){
                    let temp=ptr;
                    if(ptr.right==null || (ptr.left!=null && ptr.right.h<ptr.left.h-1)){
                        if(ptr.left.left==null || (ptr.left.right!=null && ptr.left.left.h<ptr.left.right.h)) ptr.left.leftRotate();
                        ptr=ptr.rightRotate();
                    }
                    else if(ptr.left==null || (ptr.right!=null && ptr.left.h<ptr.right.h-1)){
                        if(ptr.right.right==null || (ptr.right.left!=null && ptr.right.left.h>ptr.right.right.h)) ptr.right.rightRotate();
                        ptr=ptr.leftRotate();
                    }
                    if(temp==this.root) this.root=ptr; 
                }
                ptr=ptr.parent;
            }
            //if it hasnt changed no need to balance
            else break;            
        }

        return true;
    }
}


var tree= new avlTree();

function checkTranscID(data){
    // !arr[i]["payername"].match(/^[0-9a-z]+$/gi)
    if(data.length==12 && data.match(/^[0-9a-z]+$/gi)) return tree.insert(new node(data));
    else return false;
}

exports.checkTranscID=checkTranscID;

// TESTING CODE
// tr= new avlTree();
// const arr=[10, 11, 6, 8, 7, 11]
// const arr1=["10", "11", "6", "8", "7", "11"];
// const arr2=["10AB14523654","101236523652","a@bc","101236523652"];
// for (const num of arr2){
//     // console.log("inserting  ",num);
//     // console.log(tree.insert(new node(num)));
//     console.log(checkTranscID(num));
// }

// console.log("\n\n\nTraversing...");
// tree.traverse(tree.root);
