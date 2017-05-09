// mongoDB connection
const Photos = require('./index.js');
const tempArray=[];

//Get all the details from mongoDB
Photos.photos.findAsync({})
.then(function(results) {
  tempArray = results[0].photoListName.hrsf_76;
  createAnotherCollection(tempArray);
})
.catch(function(err) {
  console.log('ERROR FINDING ALL PHOTOS-----', err);
});

//create one more collection with photogallery schema
const createAnotherCollection = (tempArray) => {
tempArray.forEach(function(item) {
  const picgallery = new Photos.photoGallery();
  picgallery.userName = item.userName;
  picgallery.filePath = item.filePath;
  picgallery.galleryName = "hrsf_76";
  picgallery.saveAsync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log('ERROR CREATING A COLLECTION-----', err);
  })
});
}