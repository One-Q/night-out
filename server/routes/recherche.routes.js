import { Router } from 'express';
import * as RechercheController from '../controllers/recherche.controller';
const router = new Router();

router.route('/recherche').get(RechercheController.getRecherche);

export default router;
