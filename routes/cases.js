
const express = require('express')
const auth = require('../middleware/auth');
const multer = require('multer')  
const router = new express.Router()
const api_helper = require('../api-helper');
const Case = require('../models/case');
const User = require('../models/user');


function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}


const caseImage = multer({
  limits:{
      fileSize:3000000
  },
  fileFilter(req,file,cb){
      if(!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
          return cb(new Error('This is not a correct format of the file'))

      cb(undefined,true)
  }
})

router.post('/new/case', auth ,caseImage.array('caseImage',3), async(req,res) =>{
    const imagesArray = []
    let cnr = ''
    let lat;
    let long;
    console.log(req.user._id);
    var currentTime = new Date()
    let newCase;
    try{
      response = await api_helper.make_API_call(`https://api.opencagedata.com/geocode/v1/json?q=${req.body.location}&key=${process.env.GEOCODER}`)
    // .then(response => {
        // res.json(response)
         cnr = response.results[0].components.state_code + response.results[0].components.state_district.substring(0,2).toUpperCase() + 0 + Math.floor(1+ Math.random() * 5) + (Math.floor(100000 + Math.random() * 900000)) + currentTime.getFullYear();
         console.log(cnr);
         lat =response.results[0].geometry.lat;
         long = response.results[0].geometry.lng;

         let judges = await User.find({type:"judge"});
         let min = getDistanceFromLatLonInKm(lat,long,judges[0].latitude,judges[0].longitude);
         let finalJudge = judges[0];
         judges.splice(0,1);
         judges.forEach(judge => {
            let d = getDistanceFromLatLonInKm(lat,long,judge.latitude,judge.longitude);
            if(d<min)
            {
              min = d;
              finalJudge = judge;
            }
            else if(d === min)
            {
              if(judge.noOfCases < finalJudge.noOfCases)
              {
                finalJudge = judge;
              }
            }
         });

         if(req.files == undefined)
         {
            newCase = new Case(
              {
                cnr:cnr,
                title:req.body.title,
                idRep:req.user._id,
                nameRep:req.user.name,
                nameAccused:req.body.nameAccused,
                gender:req.body.gender,
                age:req.body.age,
                details:req.body.details,
                clause:req.body.clause,
                phone:req.body.phone,   
                location:req.body.location,
                latitude:lat,
                longitude:long,
                dangerousCriminal:req.body.dangerousCriminal,
                judgeAssigned: finalJudge._id
              }
            )
         }
         else
         {
          req.files.forEach(element => imagesArray.push(element.buffer))
          newCase = new Case(
            {
               cnr:cnr,
               title:req.body.title,
               idRep:req.user._id,
               nameRep:req.user.name,
               nameAccused:req.body.nameAccused,
               gender:req.body.gender,
               age:req.body.age,
               details:req.body.details,
               clause:req.body.clause,
               phone:req.body.phone,   
               location:req.body.location,
               latitude:lat,
               longitude:long,
               dangerousCriminal:req.body.dangerousCriminal,
               judgeAssigned: finalJudge._id,
               images:imagesArray
            }
          )
         }
         
         
    await newCase.save();
    finalJudge.noOfCases +=1;
    finalJudge.assignedCaseIds.push(cnr);
    await finalJudge.save();      
    
    const loggedInUser = await User.findById(req.user._id);
    loggedInUser.noOfCases +=1;
    loggedInUser.assignedCaseIds.push(cnr);
    await loggedInUser.save(); 

    res.status(201).send({message:"Case Succesfully Filed",newCase})
    }
    catch (e){
        res.send(e);
    }
})

router.get('/dashboard/profile', auth, async (req,res) => {
  console.log("Hello")
  let userId = req.user._id;
  let profileInfo = await User.findById(userId);
  console.log(profileInfo);
  let cases = [] 
  let hDate; 
    if(req.user.type === 'judge'){
      console.log("INnn")
      if(profileInfo.noOfCases > 0)
      {
        const judgeCaseIds = profileInfo.assignedCaseIds;
        const myMap = new Map();
        for (const caseId of judgeCaseIds) {
          
          const judgeCase = await Case.findOne({cnr:caseId});
          const dCriminal = judgeCase.dangerousCriminal;
          const date = judgeCase.date;
          let diff;
          // if(judgeCase.lastHearingDate){
            // diff = Math.floor((judgeCase.lastHearingDate - date)/(24*60*60*1000));
          // }else{
            diff = Math.floor((Date.now() - date)/(24*60*60*1000));
          // }
          const ml = require('../ml');
          ml.start(dCriminal, diff, async function(result) {
            
              result = result.replace("[", "").replace("]", "")
              result = parseFloat(result);
              console.log('hello',result, typeof(result));
              myMap.set(judgeCase, result);
              console.log(myMap.values());
            
          })
          
        }
        setTimeout(function() {

          console.log('here',myMap.values())
          // sort by value
          const mapSort = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));
          // console.log(mapSort);

          let jCases = Array.from( mapSort.keys() );
          jCases.forEach(jCase => {
            console.log(jCase.title);
            if(jCase.hearingDate)
            {
              hDate = jCase.hearingDate;
            }else{
              hDate = "Hearing Date not assigned yet"
            }
            cases.push({
              title:jCase.title,
              details:jCase.details,
              clause:jCase.clause,
              hearingDate: hDate,
              cnr:jCase.cnr,
              status:jCase.status
            });
          });

          console.log("hi",cases);
          profileInfo = {
            ...profileInfo,
            cases
          }
          // console.log("Mesasge",profileInfo);
    
          // profileInfo.assign(profileInfo,cases)
          res.status(200).send(profileInfo);
          
        },14000)
      }
    }else{
      // let userId = req.user._id;
      // let profileInfo = await User.findById(userId);
      // console.log(profileInfo);
      // let cases = []
      // let hDate;
      if(profileInfo.noOfCases > 0)
      {
        const judgeCaseIds = profileInfo.assignedCaseIds;
        for (const caseId of judgeCaseIds) {
          
          const judgeCase = await Case.findOne({cnr:caseId});
          // console.log(caseId);
          if(judgeCase.hearingDate)
          {
            hDate = judgeCase.hearingDate;
          }else{
            hDate = "Hearing Date not assigned yet"
          }
          cases.push({
            title:judgeCase.title,
            details:judgeCase.details,
            clause:judgeCase.clause,
            hearingDate: hDate,
            cnr:caseId,
            status:judgeCase.status
          })
          
        }
      }
      // console.log(profileInfo);
      profileInfo = {
        ...profileInfo,
        cases
      }
          // console.log("Mesasge",profileInfo);
    
          // profileInfo.assign(profileInfo,cases)
      res.status(200).send(profileInfo);
    }
    
  
});


router.get('/stats/cases',  async (req,res) => {
  let openCases = await Case.find({status:"open"})
  let closedCases = await Case.find({status:"closed"})
  let obj = {openCases:openCases.length, closedCases: closedCases.length};
  res.status(200).send(obj);

});

router.get('/dailyFilled/cases',  async (req,res) => {

  const dailyFilledCases = await Case.find({date: {$gt: Date.now() - 86400000 }});
  res.status(200).send({noOfCases:dailyFilledCases.length});

});

router.post('/search/cnrNumber',  async (req,res) => {

  const CNRcase = await Case.findOne({cnr:req.body.cnr});
  res.status(200).send({Case:CNRcase});

});

router.post('/add/hearingDate', auth , async (req,res) => {
  const hearingCase = await Case.findOne({cnr:req.body.cnr});
  hearingCase.hearingDate = req.body.hearingDate;
  await hearingCase.save();
  res.status(200).send(hearingCase);

});

// router.post('/prioritize', auth, async (req, res) => {

// })



module.exports = router