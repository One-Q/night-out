import Event from '../models/event';

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
 * Get multiple events
 * @param req
 * @param res
 */
export function getResearch(req, res) {
  /*Event.find().exec((err, event) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ event });
  });
  */
  console.log(res.body);
  res.end();
}
