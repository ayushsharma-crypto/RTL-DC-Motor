const axios = require('axios');
axios.defaults.withCredentials = true

export function signupData(newUser){
    axios.post("http://localhost:4000/user/signup", JSON.stringify(newUser),{
      headers:{ 
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*'
       }
    }
    ).then(res => {
      console.log("Adding: \n");
      console.log(res.data);
      if(res.data.success === false)
        alert("This email-id has already been taken! Try with a different email-id");
      else
      {
        // localStorage.removeItem("currentUser");
        // localStorage.setItem('currentUser',JSON.stringify(res.data.email));
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log("setting local storage as: \n");
        // console.log(currentUser.email);
        window.location.href="http://localhost:3000/sessionsList";
        // this.props.history.push("/sessionsList");
      }
    });
}

export function checkedLogged(){
    axios.get('http://localhost:4000/checklog',{
      headers:{ 
          'Content-Type': 'application/json',
       }
    })
    .then(function (response) {
      // console.log(response);
        if(response.data.message!=="Authenticated"){
          window.location.href="http://localhost:5000/signin";
        }    
    })
    .catch(function (error) {
      console.log(error);
    });
  }


export async function GetUnBookedSessions(Data){
  return new Promise((resolve,reject) => {
    try {
      axios.get("http://localhost:4000/booking/getslot",{ params : Data}).then(res => {
              console.log("Got slots: \n");
              console.log(res.data);
              if(res.data.success === true)
              {
                resolve(res.data.slots);
                  // return res.data.slots;
              }
              else {
                resolve(["error"]);
                alert("No Data Received");
              }
          });  
    } catch (error) {
        alert("Request Not Sent")
    }
  });
  
}

export async function BookSession(session){
  return new Promise((resolve,reject) => {
    try {
      axios.post("http://localhost:4000/booking/addsession", session).then(res => {
      console.log("Adding session: \n");
      console.log(res.data);
      if(res.data.success === true)
      {
          alert(res.data.res);
          window.location.href="http://localhost:3000/sessionsList";
      }  
      else 
      {
          alert("Session was not Booked");
      }
     });
    }
   catch (error) {
        alert("Request Not Sent")
    }
    
  
  });
}

export async function GetBookedSession(){
  return new Promise((resolve,reject) => {
    try {
      axios.get("http://localhost:4000/booking/getsession")
       .then(response => {
           if(response.data.success === true)
           {
               console.log(response.data.sessions);
               resolve(response.data.sessions);
           }
           else
           {
            alert("Not able to get session.");
            window.location.href="http://localhost:3000/sessionsList";
           }
      });
    }
   catch (error) {
        alert("Request Not Sent")
    }
  });
}

export async function DeleteSession(req){
  return new Promise((resolve,reject) => {
    try {
      axios.post("http://localhost:4000/booking/deleteSession", req)
      .then(response => {
          if(response.data.success === true)
          {
              alert(response.data.res);
              window.location.href="http://localhost:3000/sessionsList";
          }
          else 
          {
            alert("Not able to Delete Data");
          }
      });
    }
   catch (error) {
        alert("Request Not Sent");
    }
  });
}

export async function GetExperimentDataById(req){
  return new Promise((resolve,reject) => {
    try {
      axios.post("http://localhost:4000/booking/experimentdata", req)
    .then(response => {
        if(response.data.success === true)
        {
            console.log(response.data.data);
            resolve(response.data.data);
        }
    });
    }
   catch (error) {
        alert("Request Not Sent");
    }
  });
}

export async function GetExperimentList(req){
  return new Promise((resolve,reject) => {
    try {
      axios.post("http://localhost:4000/booking/getExperiment", req)
        .then(response => {
            if(response.data.success === true)
            {
                console.log(response.data.experiments);
                resolve(response.data.experiments)

            }
        });
    }
   catch (error) {
        alert("Request Not Sent");
    }
  });
}

export async function CreateNewExperiment(exp){
  return new Promise((resolve,reject) => {
    try {
      axios.post("http://localhost:4000/booking/createxperiment", exp).then(res => {
            console.log("Creating: \n");
            console.log(res.data);
            if(res.data.success === true)
            {
              try{
                axios.post("http://127.0.0.1:8080/~/in-cse/in-name/AE-RTL-MOTOR", {
                    "m2m:cnt":{
                        "rn": res.data.res,
                        "mni": 120
                    }
                });

                this.props.history.push({
                    pathname: "http://localhost:4000/session",
                    state: { experiment_id :  res.data.res}
                  });
              }
              catch {
                DeleteExperimentById({
                  experiment_id : res.data.res,
                  session_id : exp.session_Id,
                });
                alert("ERROR: PLease create New experiment, Couldn't connect to sensors");
              }
                
            }
            else
            {
                alert(res.data.res);
            }
        });
    }
   catch (error) {
        alert("Request Not Sent");
    }
  });
}

export async function DeleteExperimentById(req){
  return new Promise((resolve,reject) => {
    try {
      axios.post("http://localhost:4000/booking/deleteExperiment", req)
        .then(response => {
            if(response.data.success === true)
            {
                alert(response.data.res);
                window.location.reload(false);
            }
            else 
            {
                alert("Unable to Delete");
            }
        });
    }
   catch (error) {
        alert("Request Not Sent");
    }
  });
}

// 