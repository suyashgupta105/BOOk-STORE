var mongoose=require("mongoose")

var ground=require("./models/ground");
var comments=require("./models/comments");
var data=[{
    title:"Book 1",image:"https://image.shutterstock.com/image-photo/flying-by-lake-260nw-111732092.jpg",description:"Discovery and Monitoring engine is deprecated"},
   { title:"Book 2",image:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",description:"Description 2"},
   { title:"Book 3",image:"https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539__340.jpg",description:"Description 3"
}];
function seedDB(){
    ground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed previously stored data");
    });

    data.forEach(function(imgdata){
        ground.create(imgdata, function(err,data){
            if(err){
                console.log(err)
            }
            else{
                console.log("Added an image and its description");

            comments.create(
                {
                   name:"Suyash",
                   text:"Favroute book",
                   date:Date() 
                },function(err,comments){
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        data.comment.push(comments);
                        data.save();
                        console.log("created a new comment");
                    }
                });
            }
        });
    });
}
module.exports=seedDB;