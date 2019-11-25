const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios")
const app = express();
const router = express.Router();
const MongoClient = require("mongodb");


const DATABASE_NAME = "WebAPIAssignment"
const db = "mongodb+srv://shirayuki:abcd1234@clustermongo-4nyjl.mongodb.net/test?retryWrites=true&w=majority"
const coinAPIKey = "121A0A85-0D3B-4F01-8D29-DF60A4638FDB";
//note that exchangeAPI does not require API key

mongoose
.connect(db)
.then(()=>{
    console.log('moogoose connected to mongodb');
})
.catch((error)=>{
    console.log('mongoose connection error: '+error);
})

//main page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});
//for switching places
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+"/index.html"));
});

//convert page
app.get("/convert",(req,res)=>{
    res.sendFile(__dirname+'/convert.html');
});
router.get("/convert",(req,res)=>{
    res.sendFile(path.join(__dirname+"/convert.html"));
});

//history page
app.get("/history",(req,res)=>{
    res.sendFile(__dirname+"/history.html")
});
router.get("/history",(req,res)=>{
    res.sendFile(path.join(__dirname+"/history.html"));
});

//Login page
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/login.html")
});
router.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname+"/login.html"));
});

//API call
//get rates based on amount
//example string http://localhost:5000/api/convert?base=MYR&amount=1000&to=USD
app.get("/api/convert",(req,res)=>{
    
    let base = req.query.base;
    let to = req.query.to;
    let amount = req.query.amount
    const query = `http://api.exchangeratesapi.io/latest?base=${base}`

    axios.get(query)
    .then(response =>{
        console.log(response.data.rates.USD);
        let output = amount * response.data.rates.to;
        //replace CAD if found the solution
        res.send("Amount from " + amount + " " + base + " to " + " CAD " + " is: " + output);
    })
    .catch(error =>{
        console.log(error);
    });
});

app.get("/api/rates",(req,res){
    let
})

//get rates base and amount
app.get("/api/ratesTest",(req,res)=>{
    const query ="httphttp://api.exchangeratesapi.io/latest"
    
    axios.get(query)
    .then (response =>{
        res.send("")
    })
    .catch(error =>{
        console.log("Error at ratesTest: "+error);
    })
})

//add the router
app.use('/',router);
app.use('/convert',router)
app.use('/history',router)
app.use('login',router)

app.listen("5000",()=> console.log("Listening on port 5000..."))