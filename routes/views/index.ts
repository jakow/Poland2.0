import { Router } from 'express';
import { home } from './home';
import { about } from './about';
import { pastEditions } from './past-editions';
import { empowerPL } from './empowerPL';

const router = Router();
router.get('/home', home);
router.get('/about', about);
router.get('/past-editions', pastEditions);
router.get('/empowerPL', empowerPL);

export default router;
