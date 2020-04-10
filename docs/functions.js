/**
 * Resizing the Image passed in the body of the request
 * @param {object} req  -The request that contains the passed image in the request body
 * @param {object} res  -The response to return
 * @param {function} uploadImagefn -Callback function to choose the type of user(regular user or artist) to assign the image to
 * @returns {string} -Returns an error message if the uploaded file was not an image
 */
reSizeUserImage = async (req,res,uploadImagefn)=>{
    if(req.file){
        imageName=userId+Date.now()+".png"
        req.file.filename=imageName;
        newImagePath="./Pictures/"+imageName;
        sharp(req.file.buffer)
        .resize(600,600)               //default is centre allignment
        .toFormat("png")
        .png({quality:90})
        .toFile(newImagePath)
        uploadImagefn();    
    }
    else{
        return res.status(400).send("Please Upload an image");
    }
};


/**
 * Assiging the image as the new profile picture of the user
 * @param {object} req  -The request that contains the passed image in the request body
 * @param {object} res  -The response to return
 * @returns {string} -Returns a success message if the image of the user has been changed succesffully
 */
AssignUserImage= async(req, res)=>{
    User.findByIdAndUpdate({_id:userId},{$set:{imagePath:imageName}}).then((n)=>{
            res.status(200).send("Image changed successfully");
    });
}

/**
 * Assiging the image as the new profile picture of the artist
 * @param {object} req  -The request that contains the passed image in the request body
 * @param {object} res  -The response to return
 * @returns {string} -Returns a success message if the image of the artist has been changed succesffully
 */
AssignArtistImage= async(req, res)=>{
    artist.findByIdAndUpdate({_id:userId},{$set:{imagePath:imageName}}).then((n)=>{
            res.status(200).send("Image changed successfully");
    });
}