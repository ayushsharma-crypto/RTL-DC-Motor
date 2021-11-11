var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Session = require("../models/Sessions");
const Userexperiment = require("../models/UserExperiment");
const Usersessions = require("../models/UserSessions");
const UserSessions = require("../models/UserSessions");
const UserExperiment = require("../models/UserExperiment");

router.post("/addsession", (req,res) => {
        var username = 'k@gmail.com';
        var StartTime = req.body.starttime.substring(0,2) + "00";
        var EndTime = req.body.starttime.substring(0,2)  + "59";
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
                Session.findOneAndUpdate({
                        date : req.body.date,
                        slots : {$ne : StartTime},
                    },{
                        $push : { slots : StartTime,},
                    },{
                        new: true,
                        rawResult:true,
                    },function(err,slot) {
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
                                User.findOneAndUpdate({
                                        email : username,
                                    },{
                                        $push: { sessions : session.id},
                                    },function(err,user){
                                            console.log(user);
                                            res.json({ success : true, res: "Session reserved successfully" , });
                                    }
                                );
                            });            
                        }
                        else {
                            res.json({ success : false, res : 'Slot already booked', });
                        }
                    });
            }
        )
});

function createHour(index)
{
    if(index >= 10){
        ind = String(index);
    }
    else {
        ind =  '0' + String(index);
    }
    return ind;
}


router.get("/getslot",(req,res)=>{
        
        var filter = {date : req.query.date};
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
});

router.post("/createxperiment",async (req,res)=>{

        var username = req.body.email.email;
        var datetime = new Date().toLocaleString("en-GB", {timeZone: "Asia/Kolkata"});
        var dateFormat = datetime.substring(6,10)+ '-' + datetime.substring(3,5) + '-' + datetime.substring(0,2);
        var Curr_Time = datetime.substring(12,14);
        console.log(dateFormat);
        console.log(Curr_Time);
        const Session_list = await Usersessions.find({
            email : username,
            sessionDate : dateFormat,   
            sessionStartTime : { '$regex': '^'+ Curr_Time, '$options': 'i' },
        });
        console.log(Session_list);
        if(Session_list)
        {
            const newExp = new Userexperiment({
                experimentData: [],
                description : '',
                isactive : false,
            });
            newExp.save(function(err,exp){
                Usersessions.findOneAndUpdate(
                    {email : username,
                    sessionDate : dateFormat,   
                    sessionStartTime : { '$regex': '^'+Curr_Time, '$options': 'i' }},
                    {
                        $push : {
                            experiments : exp.id,
                        },
                    },{
                        new : true,
                    },
                    function(err,sess)
                    {
                        if(sess){
                            res.json({success : true,res : "Experiment added with id" + exp.id, });
                        }
                    }
                );
            });
        }
        else 
        {
            res.json({success: false, res: "This session is not booked by you.",});
        }
});


function GetUsername(req){
    const username = GetUsername(req)
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [username,password] = credentials.split(':');
    return username;
}

router.post("/experimentdata",async (req,res)=>{
    const data = await Userexperiment.findOne({ _id : req.body.experiment_id});
    if(data){
        res.json({success : true,data : data,});
    }
    else {
        res.json({success : false, res : "no experiment found with this id",});
    }
});

router.post("/getExperiment",async (req,res) => {
    username = "k@gmail.com"
    var datetime = new Date().toLocaleString("en-GB", {timeZone: "Asia/Kolkata"});
    var Curr_Time = datetime.substring(12,14);
    console.log(req.body)
    let user = await UserSessions.findOne({
        email : username,
        _id : req.body.session_id,   
        // sessionStartTime : { '$regex': '^' + Curr_Time, '$options': 'i' },

    });
    console.log(user);


    let result_experiments = [];
    let list = user.experiments.toObject(); 
    for (sess in list)
    {
        result_experiments.push({
            ExperimentId : list[sess]
        });
    }
    console.log(result_experiments);
    res.json({success : true, res : "success", experiments : result_experiments, });
});

router.get("/getsession",async (req,res) => {
    username = "k@gmail.com"
    let user = await User.findOne({email : username});
    let result_session = [];
    let list = user.sessions.toObject(); 
    for (sess in list)
    {
        console.log(list[sess]);
        let temp = await Usersessions.findOne({_id : list[sess]},{sessionDate : true, sessionStartTime: true});
        result_session.push({
            sessionStartTime : temp.sessionStartTime.substring(0,2) + ':' + temp.sessionStartTime.substring(2,5),
            sessionDate : temp.sessionDate,
            sessionId : list[sess],
        });
    }
    
    res.json({ success : true, res : "success", sessions : result_session, });
});


module.exports = router;

