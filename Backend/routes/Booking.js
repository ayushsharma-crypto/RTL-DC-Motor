var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Session = require("../models/Sessions");
const Userexperiment = require("../models/UserExperiment");
const Usersessions = require("../models/UserSessions");

router.post("/addsession", (req,res) => {
    if(req.isAuthenticated)
    {
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
        var [username, password] = credentials.split(':');


        var StartTime = req.body.starttime.substring(0,2) + "00";
        var EndTime = req.body.starttime.substring(0,2)  + "59";
        console.log(typeof StartTime);
        // console.log(EndTime);
        Session.findOneAndUpdate(
            {
                date : req.body.date,
            },
            {
                date : req.body.date,
            },
            {
                new : true,
                rawResult : true,
                upsert : true,
            },
            function(err,sess)
            {
                Session.findOneAndUpdate(
                    {
                        date : req.body.date,
                        slots : {$ne : StartTime},
                    },
                    {
                        $push : { slots : StartTime,},
                    },
                    {
                        new: true,
                        rawResult:true,
                    },
                    function(err,slot) {
                        // console.log(slot);
                        if(slot.lastErrorObject.updatedExisting)
                        {
                            const newSession = new Usersessions({
                                email: username,
                                sessionDate : req.body.date,
                                sessionStartTime : StartTime,
                                sessionEndTime : EndTime,
                                experiment : [],
                            });
                            
                            newSession.save(function(err,session){
                                User.findOneAndUpdate(
                                    {
                                        email : username,
                                    },
                                    {
                                        $push: { sessions : session.id},
                                    },
                                    function(err,user){
                                            console.log(user);
                                            res.json({
                                                success : true,
                                                res: "Session reserved successfully" ,
                                            });
                                    }
                                );
                            });            
                        }
                        else 
                        {
                            res.json({
                                success : false,
                                res : 'Slot already booked',
                            });
                        }
                    });
            }
        )
        
    }
    else 
    {
        res.json({
            success : false,
            res: " user not logged in",
        });
    }
});

function createHour(index)
{
    if(index >= 10)
    {
        ind = String(index);
    }
    else 
    {
        ind =  '0' + String(index);
    }
    return ind;
}


router.get("/getslot",(req,res)=>{
    if(req.isAuthenticated)
    {
        
        var filter = {date : req.body.date};
        Session.findOne(filter,
         function (err,docs) {
            myArray = []    
            for (let index = 1; index < 24; index++) {
                myArray.push(createHour(index) + '00');
            }
            if(docs)
            {
                item = docs.slots.toObject();
                
                myArray = myArray.filter(function (b) {
                    return item.indexOf(b) === -1;
                });
            }              
            
            for (let index = 0; index < myArray.length; index++) {
                const element = myArray[index];
                myArray[index] = element.substring(0,2) + ':' + "00";
            }  
            res.json({
                success : true,
                res : "Slots send",
                slots : myArray, // list
            });
        }); 
    }
    else
    {
        res.json({
            success: false,
            res: "user not auth",
        })
    }
    
});

router.post("/createxperiment",(req,res)=>{
    if(req.isAuthenticated)
    {
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
        const [username, password] = credentials.split(':');
        
        var datetime = new Date().toLocaleString("en-GB", {timeZone: "Asia/Kolkata"});
        var dateFormat = datetime.substring(6,10)+ '-' + datetime.substring(3,5) + '-' + datetime.substring(0,2);
        var Curr_Time = datetime.substring(12,14)+datetime.substring(15,17) +datetime.substring(18,20);
        console.log(dateFormat);
        
        console.log(Curr_Time);

        var filter = {
            email : username,
            sessionDate : dateFormat,
            sessionStartTime : { $lte : Curr_Time },
            sessionEndTime : { $gte : Curr_Time }
        }
        
        Usersessions.findOne(filter,function(err,Sessions) {        
            console.log(Sessions);
            if(Sessions)
            {
                const newExp = new Userexperiment({
                    experimentData: [],
                    description : req.body.desc,
                    isactive : false,
                });
                newExp.save(function(err,exp){
                    Usersessions.findOneAndUpdate(
                        filter,
                        {
                            $push : {
                                experiments : exp.id,
                            },
                        },
                        {
                            new : true,
                        },
                        function(err,sess)
                        {
                            if(sess)
                            {
                                res.json({
                                    success : true,
                                    res : "Experiment added",
                                });
                            }
                        }
                    );
                });
            }
            else 
            {
                res.json({
                    success: false,
                    res: "This session is not booked.",
                });
            }
        });
    }
    else 
    {
        res.json({
            success : false,
            res: "user not auth",
        })
    }
    
});

router.put("/startexperiment",(req,res)=>{
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [username, password] = credentials.split(':');
    
    var datetime = new Date().toLocaleString("en-GB", {timeZone: "Asia/Kolkata"});
    var dateFormat = datetime.substring(6,10)+datetime.substring(3,5) +datetime.substring(0,2);
    var Curr_Time = datetime.substring(12,14)+datetime.substring(15,17) +datetime.substring(18,20);
    console.log(dateFormat);
    console.log(Curr_Time);

    var filter = {
        email : username,
        sessionDate : dateFormat,
        sessionStartTime : { $lte : Curr_Time },
        sessionEndTime : { $gte : Curr_Time }
    }
    // Usersessions.findOne(filter, function(err,session){
    //     if(session)
    //     {

    //     }
    //     else 
    //     {
    //         res.json({
    //             success : false,
    //             res : "Error in backend in startexperiment api",
    //         });   
    //     }
    // });
});

router.put("/stopexperiment",(req,res)=>{
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [username, password] = credentials.split(':');
    
    var datetime = new Date().toLocaleString("en-GB", {timeZone: "Asia/Kolkata"});
    var dateFormat = datetime.substring(6,10)+datetime.substring(3,5) +datetime.substring(0,2);
    var Curr_Time = datetime.substring(12,14)+datetime.substring(15,17) +datetime.substring(18,20);
    console.log(dateFormat);
    console.log(Curr_Time);

    var filter = {
        email : username,
        sessionDate : dateFormat,
        sessionStartTime : { $lte : Curr_Time },
        sessionEndTime : { $gte : Curr_Time }
    }
});

// router.get("/getexperiment",(req,res) => {

// });

router.get("/experimentdata",(req,res)=>{
    Userexperiment.findOne({ _id : req.body.experimentid},function(err,data){
        if(data)
        {
            res.json({
                success : true,
                data : data,
            });
        }
        else 
        {
            res.json({
                success : false,
                res : "no experiment found with this id",
            });
        }
    });
});

router.get("/getsession",(req,res) => {
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [username, password] = credentials.split(':');
    
    User.findOne({email : username}, function(err,user){
        if(user)
        {
            var session_arr = user.sessions.toObject();
            var result_sessions = []
            console.log(session_arr);
            for (let index = 0; index < session_arr.length; index++) {
                const element = session_arr[index];
                Usersessions.findOne({_id : element},{sessionDate : true, sessionStartTime: true},function(err,session_element){
                    if(session_element)
                    {
                        result_sessions.push({
                            sessionStartTime : session_element.sessionDate,
                            sessionDate : session_element.sessionDate,
                        });
                    }
                });
            }
            res.json({
                success : true,
                res : "success",
                sessions : result_sessions,
            });
        }
        else 
        {
            res.json({
                success : false,
                res : "Error in backend in getsession api",
            });   
        }
    });
});

router.get("/value",(req,res)=>{
        // This route connects to ESP 32 AND GET DATA FROM IT.
});


module.exports = router;




