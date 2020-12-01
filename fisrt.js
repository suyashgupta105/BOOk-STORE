// var http= require('http');
// http.createServer(function(req, res){
// res.write("hi world");
// res.end();
// }).listen(6004);
var expressSanitizer = require('express-sanitizer'),
   express=require("express"),
    bodyParser=require("body-parser"),
    app=express(),
    methodOverride=require("method-override"),
    mongoose=require("mongoose"),
    ground = require("./models/ground"),
    Comment=require("./models/comments");
    //seedDB=require("./seeds")
    //seedDB();
    mongoose.connect('mongodb://localhost:27017/suyash', {useNewUrlParser: true});




//SCHEMA SETUP
// var schema=new mongoose.Schema({ title:String,image:String,description: String})
// var newSchema=new mongoose.Schema({name:String,comment:String,date:Date})
// var ground=mongoose.model("ground",schema);
// var comments=mongoose.model("comments",newSchema);

// ground.create({
//         title:"ground3",
//         image:"https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683__340.png"
// }
//     ,function(err,data){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("new record submitted")
//             console.log(data)
//         }
//     }
// );

//ground.remove( { } );


app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_mo"));
app.use(express.static("public"));
app.set("view engine","ejs");

var img=[{title:"book 1",image:"https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"},
        {title:"book 2",image:"https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636__340.jpg"}
];

app.get("/",function(req,res){
   // res.send("hi friend,homepage");
   res.render("home");
})
app.get("/contact",function(req,res){
    //res.send("This is contact page");
    res.render("contact",{name:"Suyash", last_name:"Gupta"});
})
app.get("/services",function(req,res){
    var books=[{title:"book 1",auhtor:"Raghu"},
                {title:"book 2",auhtor:"Oliver"},
                {title:"book 3",auhtor:"Satyajeet"}
                ];
    
    res.render("services",{bookss:books});
    
})
app.get("/form",function(req,res){
    res.render("grounds/form");
});
app.get("/images",function(req,res){
   
    ground.find({},function(err,allgrounds){
        if(err)
        {
            console.log(err);
        }else 
        {
            res.render("grounds/images",{imgs:allgrounds}) ;   
        }
    }) 
      
})
app.get("/images/:id",function(req,res){
    ground.findById(req.params.id).populate("comment").exec(function(err,data){
        if(err){
            console.log(err);
        }
        else{
        //  console.log(data);
            res.render("grounds/show",{single:data});
        }
    })
})
app.get("/images/:id/edit",function(req,res){
    ground.findById(req.params.id,function(err,foundImage){
        if(err){
            res.redirect("/images");
        }else{
           res.render("edit",{imagecon:foundImage});
           
        }
    })
})

app.put("/images/:id",function(req,res){
    //res.send("hi dear friend");
    ground.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedInfo){
        if(err)
        {
            res.redirect("/images");
        }
        else{
           
            res.redirect("/images/"+req.params.id);
        }
    })
})
app.delete("/images/:id",function(req,res){
    //res.send("hi dear friend");
    ground.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
            res.send("Invalid id");
        }

       else
        {
           res.redirect("/images");
        }
    });
});

app.post('/images',function(req, res){

   // res.send("you hit the post route");
    req.body.description=req.sanitize(req.body.description);
    var image=req.body.image;
    var title=req.body.title;
    var desc=req.body.description;
    var newimg={title:title,image:image,description:desc};
   //img.push(newimg);

   ground.create(newimg,function(err,newdata){
       if(err){
           console.log(err);
       }
       else{
           res.redirect("/images");

       }
   })
   
   //res.redirect("/images");
});
//comments routes::=>

app.get("/images/:id/comments/new",function(req,res){
    ground.findById(req.params.id , function(err,data){
        if(err){
            console.log(err);
        }
        else{
             res.render("comments/new",{data:data});
        }
        //console.log(data);
           
    })
})
app.post("/images/:id/comments",function(req,res){
    ground.findById(req.params.id , function(err,imgdata){
        if(err){
            console.log(err);
            res.redirect("/images")
        }
        else{
            console.log(req.body.comment)
            Comment.create(req.body.comment/*comment taken from "new.ejs" */,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    imgdata.comment/*pushing into schema's array */.push(comment);
                    imgdata.save();
                    res.redirect("/images/"+imgdata._id);
                }
            })
            
        }
        //console.log(data);
           
    })
    
})

app.listen(4004,function(){
    console.log("console has started");
})