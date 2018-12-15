const Listings = require("../db/models").listings;

exports.add = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const listing = await Listings.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    let images = listing.images;
    if (!images || images.length === 0) {
      images = req.body.images;
    } else {
      images = images.concat(req.body.images);
    }
    const updatedListing = await listing.update({
      images
    });
    res.json(updatedListing);
  } catch (err) {
    console.error(err);
  }
};

exports.remove = async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const listing = await Listings.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    const imageArray = listing.images;
    imageArray.splice(imageArray.indexOf(req.query.imageURI), 1);

    const updatedListing = await listing.update({
      images: imageArray.length === 0 ? null : imageArray
    });
    res.json(updatedListing);
  } catch (err) {
    console.error(err);
  }
};
