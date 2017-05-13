var facebookAuth = {

  clientID: '282508915543842',
  clientSecret: '4741930c1f55e715610de159d669900a',
  callbackURL: '/auth/facebook/callback',
  protocol: process.env.PROTOCOL,
  passReqToCallback: true,
  scope: ['user_friends'],
  'profileFields': ['id', 'emails', 'name', 'friends']


};
module.exports = facebookAuth;

