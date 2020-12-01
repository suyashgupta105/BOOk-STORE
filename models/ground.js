var mongoose=require("mongoose");

var schema=new mongoose.Schema({
     title:String,
     image:String,
     description: String,
     comment:[
         {
         type:mongoose.Schema.Types.ObjectId,
         ref:"comments"
        }
    ]
    });
module.exports=mongoose.model("ground",schema);