import Recherche from '../models/Recherche';

/**
 * Get a single event
 * @param req containing the name of the event
 * @param res 
 */
export function getEvent(req, res) {
  Recherche.findOne({ name: req.params.name }).exec((err, event) => {
    if (err)
      res.status(500).send(err)
    res.json({ event })
  })
}

/**
 * Get multiple events
 * @param req 
 * @param res 
 */
export function getEvents(req, res) {
  Recherche.find().exec((err, event) => {
    if (err)
      res.status(500).send(err)
    res.json({ event })
  })
}
