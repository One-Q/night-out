import Event from '../models/event';
import elasticsearch from 'elasticsearch';

let client = new elasticsearch.Client({
  host: "localhost:9200",
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
  /*client
  .search({
    q: search_query
  })
  .then(
    function(body) {
      console.log(body.hits.hits);
      elastic_response = body.hits.hits;
    },
    function(error) {
      return res.status(500).send(error);
    }
  );*/
return res.json({elastic_response});
}
