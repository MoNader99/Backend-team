var mongoose= require("mongoose");
//create a model 
//model fn takes 2 parameters
//first parameter is the collection name and the second parameter is an object that we will define in it the attributes that each document in this collection will take
var Todo=mongoose.model('Todos',{
    text: {
        type:String,
        required:true,
        minlength : 1 , //length must at least be 1 and not a space
        trim : true //removes any white space at the beg or end of a value can be used with strings nums and everything
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
});


module.exports={
    Todo
};