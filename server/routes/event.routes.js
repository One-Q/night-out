import { Router } from 'express';
import * as EventController from '../controllers/event.controller';

const router = new Router();

// Get all events
router.route('/events').get(EventController.getEvents);

// Get on event by name
router.route('/events/:name').get(EventController.getEvent);

router.route('/events/research').get(EventController.getResearch);

export default router;
