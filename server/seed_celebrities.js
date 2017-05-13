var Promise = require('bluebird');
const database = require('../database');
const kairos = require('./kairos.js');
Promise.promisifyAll(kairos);
const celebrityBucks = require('./celebrity-bucks.js');
Promise.promisifyAll(celebrityBucks);

var galleryName = 'celebrity' // lower resolution images

//create one more collection with photogallery schema
const createGallery = (persons) => {
  database.photo.removeAsync({galleryName: galleryName})
  .then((result) => {
    persons.forEach(function(person) {
      const picgallery = new database.photo();
      picgallery.userName = person.name;
      picgallery.filePath = `https://celebritybucks.com/images/celebs/full/${person.celebId}.jpg`;
      picgallery.galleryName = galleryName;
      picgallery.saveAsync()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log('ERROR CREATING A COLLECTION-----', err);
      })
    });
  })
  .catch((error) => {
    console.log (error);
  });
}

kairos.removeGalleryAsync(galleryName)
.then(() => {
  return celebrityBucks.topListAsync();
})
.then((results) => {
  results = JSON.parse(results);
  console.log (results);
  console.log (results.length);
  console.log (results.BonusBucks);
  console.log (results.CelebrityValues);
  createGallery(results.CelebrityValues);
  return Promise.map(results.CelebrityValues, function (person) {
  	var filePath = `https://celebritybucks.com/images/celebs/full/${person.celebId}.jpg`;
    return kairos.enrollAsync(person.name, filePath, galleryName);
  });
})
.then((results) => {
  console.log ('Kairos celebrity enroll completed', results);
  process.exit();
})
.catch((error) => {
  throw error;
});
