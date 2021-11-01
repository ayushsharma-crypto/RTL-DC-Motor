var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Session = require("../models/Sessions");
const Experiment = require("../models/Experiments");



router.put("/add", (req,res) => {
    // console.log(req.body)
    Session.findOne({ date : req.body.date }).then(day => {
        // Check if user email exists
        if (!day) {
            const newUser = new Session({
                date : req.body.date,
                slots : [req.body.starttime,]
            });
            newUser.save();
            var session = {
                sessionDate : req.body.date,
                sessionStartTime : req.body.starttime,
                sessionEndTime : req.body.endtime,
                experiment : [],
            }
            console.log(session);
            User.findOneAndUpdate(
                {
                    email : req.body.email,
                },
                {
                    $push: { sessions : session},
                },
                function(err,user){
                    // console.log(err)
                    if(err)
                    {
                        
                        res.send({
                            success: false,
                            res: "user not found",
                        })
                    }
                    else 
                    {
                        // console.log(user);
                        res.send({
                            success : "true",
                            res: "Session reserved successfully" ,
                        });
                    }
                }
            );
        }        
        else 
        {
            Session.findOneAndUpdate(
                {
                    date : req.body.date,
                    slots : {$ne : req.body.starttime},
                },
                {
                    $push : { slots : req.body.starttime,},
                },
                {
                    new: true,
                    rawResult:true
                },
                function(err,slot) {
                    console.log(slot);
                    if(!slot.lastErrorObject.updatedExisting)
                    {
                        res.send({
                            success : 'false',
                            res : 'Slot already booked',
                        });
                    }
                    else 
                    {
                        // console.log(req.body);
                        var session = {
                            sessionDate : req.body.date,
                            sessionStartTime : req.body.starttime,
                            sessionEndTime : req.body.endtime,
                            experiment : [],
                        }
                        console.log(session);
                        User.findOneAndUpdate(
                            {
                                email : req.body.email,
                            },
                            {
                                $push: { sessions : session},
                            },
                            function(err,user){
                                // console.log(err)
                                if(err)
                                {
                                    
                                    res.send({
                                        success: false,
                                        res: "user not found",
                                    })
                                }
                                else 
                                {
                                    // console.log(user);
                                    res.send({
                                        success : "true",
                                        res: "Session reserved successfully" ,
                                    });
                                }
                            }
                        );
                        
                    }
                });
        }
    });
});

router.get("/getslot",(req,res)=>{

    var filter = {date : req.body.date};
    Session.findOne({
        date : req.body.date,
    }, function (err,docs) {
        var myArray = ["1pm","2pm","3pm","4pm","5pm","6pm"];
        // console.log(myArray);
        item = docs.slots.toObject();
        // console.log(item);
        // console.log(docs);
        if(item)
        {
            myArray = myArray.filter(function (b) {
                return item.indexOf(b) === -1;
            });
            // console.log(myArray);
        }                
        res.send({
            success : "true",
            res : "Slots send",
            slots : myArray, // list
        });
    }); 
});

router.post("/verifysession",(req,res)=>{
    var filter = {
        email : req.body.email,
        "sessions.sessionDate" : req.body.sessiondate,
        "sessions.sessionStartTime" : req.body.sessionstarttime
    }
    User.findOne(filter, function(err,docs) {
        if(docs)
        {
            res.send({
                success : "true",
                res : "Session started"
            })
        }
        else 
        {
            res.send({
                success: "false",
                res: " session not booked by user",
            })
        }
    });
});

router.post("/createxperiment",(req,res)=>{
    var newexperiment = new Experiment({
        experimentData : [],
        description : req.body.description,
        isactive : false,
    });
    newexperiment.save();
});

router.put("/startexperiment",(req,res)=>{

});

router.put("/stopexperiment",(req,res)=>{

});


module.exports = router;