import Event from '../models/event';
import elasticsearch from 'elasticsearch';
import EventSearch from 'facebook-events-by-location-core';

let client = new elasticsearch.Client({
  host: "https://5868zphh:jo1w1vez3tcop8u@pine-4525505.eu-west-1.bonsaisearch.net", //localhost:9200
  log: "trace"
});

const accessTokenFacebook ="https://graph.facebook.com/endpoint?key=value&access_token=1506957062727502|77a270d081b143d06581ac7dc05424b4";
const accessTokenGoogle="AIzaSyCcbC1CoG5lG1TqdSG1S7Z1kwlMi6A3lzE";

// Instantiate EventSearch
let es = new EventSearch();

// Instantiate value for facebook research
let value = "";
  

/**
 * Get a single event
 * @param req containing the name of the event
 * @param res
 */
export function getEvent(req, res) {
  console.log(req.params.slug);
  Event.findOne({ slug: req.params.slug }).exec((err, event) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ event });
  });
}

/**
 * Get multiple events
 * @param req
 * @param res
 */
export function getEvents(req, res) {
  Event.find().exec((err, event) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ event });
  });
}

/**
 * Get researched events
 * @param req
 * @param res
 */
export function getResearch(req, res) {
  let search_query = req.params.event;
  let elastic_response;
  let mongo_response;
  client
  .search({
    index: 'events',
    type:'event',
    size: 1000,
    q: search_query
  })
  .then(
  function(body) {
      elastic_response = body.hits.hits;
      
      retrieveId(elastic_response).then(table_id => getEventsByidFromMongo(table_id)).then(elastic_mongo_response => {return res.json({elastic_mongo_response})});
      },
    function(error) {
      return res.status(500).send(error);
    }
  );

return res.status(200);
}

/**
 * Get events by id from mongo db
 * @param events
 */
function getEventsByidFromMongo(e){
  return new Promise((res, rej) => {
      Event.find({'_id' : {$in : e}}).exec((err, event) => {
        res(event)
      });
  }
  )}

/**
 * retrieve Id from a events from elasticsearch
 * @param events
 */
function retrieveId(events){
 let table_id = [];
 var i=0;
 return new Promise((res, rej) => {
    events.forEach((e) =>{
        table_id[i]=e._id;
        i++;
    })
    res(table_id)
  });
}

/**
 * Get events from Facebook by value , long , lat , distance
 * @param req
 * @param res
 */

export function getEventsFromFacebook(req, res) {
  value = req.params.value;
  fetchEventsFacebook(req.params.long,req.params.lat,req.params.distance)
  .then(events => mapFacebookEvents(events,req.params.value))
  .then(events => distinctFacebookEvents(events))
  .then(eventsFacebook => {return res.json({eventsFacebook})});

}

/**
 * Get events from Facebook without value , only long and lat 
 * @param req
 * @param res
 */
export function getEventsFromFacebookWithoutValue(req, res) {
  fetchEventsFacebook(req.params.long,req.params.lat,req.params.distance)
  .then(events =>distinctFacebookEvents(events))
  .then(eventsFacebook => {return res.json({eventsFacebook})});
}


/**
 * Map events by the value
 * @param events
 */

function mapFacebookEvents(events){
  return new Promise((res,rej) => {
    res(events.filter((e) =>  includeStr(e)));
})

}
function includeStr(event){
  return event.name!==undefined ? event.name.includes(value) : false || event.description!==undefined ?event.description.includes(value) : false ;
}

function fetchEventsFacebook(lng,lat,distance=0){
  let options = {};
  options.lng =lng;
  options.lat =lat;
  options.distance = distance;
  options.accessTokenFacebook = accessTokenFacebook;
  options.sort="distance";
  return new Promise((res,rej) =>{
    es.search(options).then(function (eventsFacebook) {
      res(eventsFacebook.events);
     }).catch(function (error) {
      rej(error);
  });
  })
 
}

function distinctFacebookEvents(events){
  let distinctEvents = [];
  let set_of_id = new Set();
  return new Promise ((res,rej) => {
    events.forEach((e)=>{
      if(!set_of_id.has(e.id)){
        set_of_id.add(e.id);
        distinctEvents.push(e);
      }
    });
    res(distinctEvents);
  })
}

export function getAdress(req,res){
  let json = "json";
  let type = "geocode";
  let language = "fr";
  let value = req.params.adress
  let urlGoogleApi = "https://maps.googleapis.com/maps/api/place/autocomplete/"+json+"?input="+value+"&types="+type+"&language="+language+"&key="+accessTokenGoogle
  console.log(urlGoogleApi);
  fetch(urlGoogleApi).then((result) => {
    return result.json();
  }).then(resultat => {return res.json({adresses : resultat})});
     //return res.json({result: result.json()});
}