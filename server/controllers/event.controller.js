import Event from '../models/event';
// import elasticsearch from 'elasticsearch';
/*
let client = new elasticsearch.Client({
  host: "localhost:9200", //https://pine-4525505.eu-west-1.bonsaisearch.net
  log: "trace"
});
*/

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
    q: search_query
  })
  .then(
  function(body) {
      elastic_response = body.hits.hits;
      
      retrieveId(elastic_response).then(table_id => getEventsByidFromMongo(table_id)).then(elastic_mongo_response => {return res.json({elastic_mongo_response})});
      //getEventByidFromMongo(elastic_response).then(res => console.log("Promise ?" , res));
      //return res.json({'mongo_response ': getEventsByidFromMongo(elastic_response)});
      },
    function(error) {
      return res.status(500).send(error);
    }
  );

return res.status(200);
}

function getEventsByidFromMongo(e){
  return new Promise((res, rej) => {
      Event.find({'_id' : {$in : e}}).exec((err, event) => {
        res(event)
      });
  }
  )}

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