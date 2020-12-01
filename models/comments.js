var mongoose=require("mongoose");

var newSchema=new mongoose.Schema({name:String,text:String,date:Date})

module.exports=mongoose.model("comments",newSchema);
