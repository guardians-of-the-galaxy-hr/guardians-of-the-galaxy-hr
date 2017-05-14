var facebookAuth = {

  clientID: '1929333797297736',
  clientSecret: '23c319fd5e5cb11f73ea365d15c89052',
  callbackURL: '/auth/facebook/callback',
  protocol: process.env.PROTOCOL,
  passReqToCallback: true,
  scope: ['user_friends'],
  'profileFields': ['id', 'emails', 'name', 'friends']


};
module.exports = facebookAuth;

