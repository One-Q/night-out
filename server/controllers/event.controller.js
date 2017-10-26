import Event from '../models/event';
import elasticsearch from 'elasticsearch';

let client = new elasticsearch.Client({
  host: "localhost:9200", //https://pine-4525505.eu-west-1.bonsaisearch.net
});


/**
 * Get a single event
 * @param req containing the name of the event
 * @param res
 */
export function getEvent(req, res) {
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
  client
  .search({
    index: 'events',
    type:'event',
    q: search_query
  })
  .then(
    function(body) {
      elastic_response = body.hits.hits
      return res.json({elastic_response});
    },
    function(error) {
      return res.status(500).send(error);
    }
  );

return res.status(200);
}
