import { Router } from 'express';
import * as EventController from '../controllers/event.controller';

const router = new Router();

// Get all events
router.route('/events').get(EventController.getEvents);

// Get on event by name
router.route('/events/:slug').get(EventController.getEvent);

router.route('/research/:event').get(EventController.getResearch);

export default router;
