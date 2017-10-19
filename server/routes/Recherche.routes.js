import { Router } from 'express';
import * as RechercheController from '../controllers/Recherche.controller';

const router = new Router();

// Get all events
router.route('/events').get(RechercheController.getEvents)

// Get on event by name
router.route('/events:name').get(RechercheController.getEvent)

export default router;
