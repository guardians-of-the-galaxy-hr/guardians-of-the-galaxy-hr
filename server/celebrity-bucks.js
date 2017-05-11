const request = require('request');
const celebrityBucksApiUrl = 'https://celebritybucks.com/developers/export/JSON?limit=1000'

const topList = (callback) => {
  console.log ('celebrity bucks top list');
  const options = {
    method: 'GET',
    url: celebrityBucksApiUrl,
  };
  request(options, (err, res, body) => {
    if (err) {
      callback(err);
    } else {
      callback(err, body)
    }
  });
};

module.exports.topList = topList;
