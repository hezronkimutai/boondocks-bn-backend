import config from './index';

const FacebookStrategy = require('passport-facebook');
const GoogleAuth = require('passport-google-oauth20');

const passport = require('passport');

const { facebookConfig, googleConfig } = config;


const strategyCallback = (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => done(null, profile));
};

passport.use(new GoogleAuth({
  clientID: googleConfig.clientID,
  clientSecret: googleConfig.clientSecret,
  callbackURL: googleConfig.callbackURL,
}, strategyCallback));

passport.use(new FacebookStrategy({
  clientID: facebookConfig.clientID,
  clientSecret: facebookConfig.clientSecret,
  callbackURL: facebookConfig.callbackURL,
  profileFields: ['id', 'emails', 'name']
}, strategyCallback));

export default passport;
