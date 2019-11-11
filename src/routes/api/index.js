import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerDefinition from '../../docs/api-specification';
import usersRouter from './users.route';
import rolesRouter from './roles.route';
import tripsRouter from './trips.route';
import authRouter from './auth';

const specs = swaggerJsdoc(swaggerDefinition);

const router = express.Router();
const prefix = '/api/v1';

router.use('/api/docs', serve);
router.use('/api/docs', setup(specs, {
  explorer: false,
  customeSiteTitle: 'Barefoot Nomad API'
}));

router.use(prefix, usersRouter);
router.use(prefix, rolesRouter);
router.use(`${prefix}/auth`, authRouter);
router.use(prefix, tripsRouter);

export default router;
