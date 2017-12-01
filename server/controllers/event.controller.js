import Event from '../models/event';
import elasticsearch from 'elasticsearch';
import EventSearch from 'facebook-events-by-location-core';
import cuid from 'cuid';
import slug from 'limax';

let client = new elasticsearch.Client({
  host: "https://5868zphh:jo1w1vez3tcop8u@pine-4525505.eu-west-1.bonsaisearch.net", //localhost:9200
  log: "trace"
});

const accessTokenFacebook = "https://graph.facebook.com/oauth/access_token?client_id=112374466143248&client_secret=2f0f3f7ce28c61a070f06afa8a5e1226&grant_type=client_credentials";


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
  Event.findOne({ slug: req.params.slug }).exec((err, event) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ event });
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
      return res.status(500).send(err);
    }
    return res.json({ event });
  });
}

/**
 * Get researched events
 * @param req
 * @param res
 */
export function getResearch(req, res) {
  let search_query = req.params.event;
  let distance = req.params.distance;
  let lat = req.params.lat;
  let lng = req.params.long;
  let elastic_response;
  let mongo_response;
  client
    .search({
      index: 'events',
      type: 'event',
      size: 1000,
      q: search_query
    })
    .then(
    function (body) {
      elastic_response = body.hits.hits;

      retrieveId(elastic_response).then(table_id => getEventsByidFromMongo(table_id,distance,lat,lng)).then(elastic_mongo_response => { console.log(elastic_mongo_response); return res.json({ elastic_mongo_response }) });
    },
    function (error) {
      return res.status(500).send(error);
    }
    );
}

/**
 * Get events by id from mongo db
 * @param events
 */
function getEventsByidFromMongo(e,distance,lat,lng) { 
  var m = distance;
  let posLocallat = lng;
  let posLocalLng = lat;
  return new Promise((res, rej) => {
    Event.find({ $and:[{ '_id': { $in: e } } , { active: true , $where : function(){
      return get_distance_m(posLocallat, posLocalLng, this.location.latitude, this.location.longitude) <= m; 
    }}]  }).exec((err, event) => {
      console.log("ffhjfjghfhjfjghf"+event)
      res(event)
    });
  }
  )
}
/*
 * Compare distance between 2 location
 * @param lat1 , lng1 , lat2 , lng2
 */
function get_distance_m(lat1, lng1, lat2, lng2) {
  let earth_radius = 6378137;
 // Terre = sphère de 6378km de rayon 
  // CONVERSION 
  let ourLng = deg2rad(lng1);
  let ourLat = deg2rad(lat1);
  let mongoLng = deg2rad(lng2);
  let mongoLat = deg2rad(lat2); 
  let distanceLng = ($mongoLng - $ourLng) / 2;
  let distanceLat = ($mongoLat - $ourLat) / 2; 
  let a = (Math.sin($distanceLat) * Math.sin($distanceLat)) + Math.cos($ourLat) * Math.cos($mongoLat) * (Math.sin($distanceLng) * Math.sin($distanceLng));
  let d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (earth_radius * d); 
} 
     

/*
 * @param x
 */
function deg2rad(x){
   return Math.PI * x/ 180; 
  }

/**
 * retrieve Id from a events from elasticsearch
 * @param events
 */
function retrieveId(events) {
  let table_id = [];
  var i = 0;
  return new Promise((res, rej) => {
    events.forEach((e) => {
      table_id[i] = e._id;
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
  fetchEventsFacebook(req.params.long, req.params.lat, req.params.distance,req.params.sort)
    .then(events => mapFacebookEvents(events, req.params.value))
    .then(events => distinctFacebookEvents(events))
    .then(eventsFacebook => { return res.json({ eventsFacebook }) });

}

/**
 * Get events from Facebook without value , only long and lat 
 * @param req
 * @param res
 */
export function getEventsFromFacebookWithoutValue(req, res) {
  fetchEventsFacebook(req.params.long, req.params.lat, req.params.distance,req.params.sort)
    .then(events => distinctFacebookEvents(events))
    .then(eventsFacebook => { return res.json({ eventsFacebook }) });
}

/**
 * Get events from Facebook without value , only long and lat 
 * @param req
 * @param res
 */

export function getEventFromFacebookById(req,res){
  var connection = "https://graph.facebook.com/v2.10/"+ req.params.id +
  "?fields=can_viewer_post,can_guests_invite,cover,declined_count,description,guest_list_enabled,id,interested_count,is_canceled,is_draft,end_time,is_viewer_admin,maybe_count,is_page_owned,name,attending_count,start_time,updated_time,type,timezone,noreply_count,scheduled_publish_time,owner,place,ticket_uri,ticketing_privacy_uri,ticketing_terms_uri" +
  "&access_token=112374466143248|8UiCaiSCYvpP8Oylv0OgWwJ1TzY";
  fetch(connection,"get").then(res => {return res.json()})
  .then(event => { return res.json({event})});
}

/**
 * Map events by the value
 * @param events
 */

function mapFacebookEvents(events) {
  return new Promise((res, rej) => {
    res(events.filter((e) => includeStr(e)));
  })

}
function includeStr(event) {
  return event.name !== undefined ? event.name.includes(value) : false || event.description !== undefined ? event.description.includes(value) : false;
}

function fetchEventsFacebook(lng, lat, distance = 0,sort) {
 /* var accessToken
  fetch(accessTokenFacebook).then(res => {return res.json()}).then(res => accessToken=res);*/
  let options = {};
  options.lng = lng;
  options.lat = lat;
  options.distance = distance;
  options.accessToken = "112374466143248|8UiCaiSCYvpP8Oylv0OgWwJ1TzY";
  options.sort = sort;
  return new Promise((res, rej) => {
    es.search(options).then(function (eventsFacebook) {
      res(eventsFacebook.events);
    }).catch(function (error) {
      rej(error);
    });
  })

}

function distinctFacebookEvents(events) {
  let distinctEvents = [];
  let set_of_id = new Set();
  return new Promise((res, rej) => {
    events.forEach((e) => {
      if (!set_of_id.has(e.id)) {
        set_of_id.add(e.id);
        distinctEvents.push(e);
      }
    });
    res(distinctEvents);
  })
}

/**
 * Create a new Event, require an authentification
 * @param req
 * @param res
 */
export function createEvent(req, res) {
  let idCreator = req.user.id;
  let name = req.body.name;
  let description = req.body.description;
  let category = req.body.category;
  let startTime = req.body.startTime;
  let location = req.body.location;
  if (!idCreator || !name || !description || !category || !startTime || !location)
    return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
  let city = req.body.location.city;
  let street = req.body.location.street;
  let latitude = req.body.location.latitude;
  let longitude = req.body.location.longitude;
  if (!city || !street || !latitude || !longitude)
    return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
  const event = new Event({
    name: name,
    description: description,
    category: category,
    location: {
      city: city,
      street: street,
      latitude: latitude,
      longitude: longitude
    },
    startTime: new Date(startTime),
    creator: idCreator,
    slug: slug(name.toLowerCase() + '-' + Date.now()),
    cuid: cuid()
  });
  event.save((err, saved) => {
    if (!err) {
      client.index({
        index: "events",
        type: "event",
        id: saved.id,
        body: {
          name: name,
          description: description,
          category: category,
          startTime: startTime,
          cuid: saved.cuid,
          slug: saved.slug,
          location: saved.location
        }
      }, (err, resp) => {
        if (!err)
          return res.status(200).json({ success: "ok" })
        else
          return res.status(500).json({ error: "Erreur interne." })
      })
    }
    else
      return res.status(500).json({ error: "Erreur interne." })
  });
}

/**
 * Delete an Event, require an authentification and user to be the author of the Event
 * @param req
 * @param res
 */
export function deleteEvent(req, res) {
  let eventId = req.body.id;
  if (!eventId)
    return res.status(400).json({ error: "Veuillez fournir l'évènement à supprimer." })
  Event.findOne({ cuid: eventId }).then((event) => {
    if (!event)
      return res.status(400).json({ error: "Event introuvable." })
    else {
      console.log(event)
      if (req.user.id != event.creator)
        return res.status(400).json({ error: "Impossible de supprimer un évènement qui n'est pas le votre." })
      Event.remove({ cuid: eventId }, (error) => {
        if (!error) {
          client.delete({
            index: "events",
            type: "event",
            id: event.id
          }, (err, resp) => {
            if (!err)
              return res.status(200).json({ success: "ok" })
            else
              return res.status(500).json({ error: "Erreur interne." })
          })
        }
        else
          return res.status(500).json({ error: "Erreur interne." })
      })
    }
  });
}