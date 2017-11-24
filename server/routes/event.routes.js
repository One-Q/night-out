import { Router } from 'express';
import * as EventController from '../controllers/event.controller';
import auth from '../auth';

const router = new Router();

// Get all events
router.route('/events').get(EventController.getEvents);

// Get on event by name
router.route('/events/:slug').get(EventController.getEvent);

// Get events from our DB
router.route('/research/:event').get(EventController.getResearch);

// Get events from Facebook
router.route('/eventsFromFacebook/:value&:distance&:long&:lat&:category').get(EventController.getEventsFromFacebook);

// Get events from Facebook without input value
router.route('/eventsFromFacebook/:long&:lat&:distance').get(EventController.getEventsFromFacebookWithoutValue);

// Create an event (login required)
router.route('/create').post(auth.authenticate(),EventController.createEvent);

// Delete a event (login required + needs to be the creator of the event)
router.route('/remove').post(auth.authenticate(),EventController.deleteEvent);
export default router;
