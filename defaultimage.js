
//THE DEFAULT IMAGE FILE WHERE DEFUALT IMAGE IS CREATED
var{images}= require("./models/images.js"); // images model
var{mongoose}= require("./db/mongoose.js");  

var defUrl="url of the default image of playlist";

images.findOne({url:defUrl}).then((defI)=>{
    if(!defI){
            var defaultImage1= new images ({
            url:defUrl,
            height:200,
            width:65,
        });
        defaultImage1.save().then(()=>{
            //mongoose.connection.close();
        });

    }
});
const defaultImage= new images ({
    url:defUrl,
    height:200,
    width:65,
}
);

exports.defaultImage=defaultImage;  




