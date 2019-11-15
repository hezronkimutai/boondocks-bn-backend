import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerDefinition from '../../docs/api-specification';
import users from './users';

const specs = swaggerJsdoc(swaggerDefinition);

const router = express.Router();
const prefix = '/api/v1';

router.use('/api/docs', serve);
router.use('/api/docs', setup(specs, {
  explorer: false,
  customeSiteTitle: 'Barefoot Nomad API'
}));

router.use(prefix, users);

export default router;
