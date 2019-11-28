import express from 'express';
import AuthController from '../../controllers/auth.controller';
import passport from '../../config/passport';
import catchErrors from '../../utils/helper';

const authRouter = express.Router();

authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

authRouter.get('/facebook/callback', passport.authenticate('facebook', { session: false }), catchErrors(AuthController.facebookSignin));

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', passport.authenticate('google', { session: false }), catchErrors(AuthController.googleSignIn));

export default authRouter;
