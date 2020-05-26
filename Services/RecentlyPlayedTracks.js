var{User}= require("./../models/users.js"); // users model
var { mongoose } = require("./../db/mongoose.js"); 

exports.AssignRecentlyPlayedTracks=AssignRecentlyPlayedTracks =(userId,streamedTrack)=>{
    var counter=0;
    var counter2=0;
    var exists=false;
    var newEntry=false;
    User.findById({_id:userId}).then((thisUser)=>{
        for(counter2;counter2<5;counter2++){
            if(thisUser.recentlyPlyaedtracks[counter2]==undefined){continue;}  // to avoid error when accessing trackPath of undefined
            else if(thisUser.recentlyPlyaedtracks[counter2].trackPath==streamedTrack.trackPath){  // if this song is already in the last 5 songs palayed do nothing
                exists=true;
                return;
            }   
        }
        if(exists==false){
            for(counter;counter<5;counter++){
                if(thisUser.recentlyPlyaedtracks[counter]==undefined){    //first 5 songs the user ever played
                    thisUser.recentlyPlyaedtracks[counter]=streamedTrack._doc;
                    thisUser.save();
                    return;
                }
            //when the user has 5 songs in the recently played tracks array and plays another song a new track should be added and the oldest track should be removed
            if(counter==4 &&thisUser.recentlyPlyaedtracks[counter]!=streamedTrack._doc){newEntry=true;}
            }


        }

        if(newEntry==true){
            var counter3=0;
            for(counter3;counter3<4;counter3++){
                thisUser.recentlyPlyaedtracks[counter3]=thisUser.recentlyPlyaedtracks[counter3+1]
                thisUser.save();

            }
            thisUser.recentlyPlyaedtracks[4]=streamedTrack._doc;
            return;
        }
    });
}
