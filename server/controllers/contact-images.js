const Contacts = require("../db/models").contacts;

exports.addContactImage = async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const contact = await Contacts.findOne({
      where: {
        id: req.body.componentId,
        UserUuid: userId
      }
    });
    let images = contact.images;
    if (!images || images.length === 0) {
      images = req.body.images;
    } else {
      images = images.concat(req.body.images);
    }
    const updatedContact = await contact.update({ images });
    res.json(updatedContact);
  } catch (err) {
    console.error(err);
  }
}

exports.deleteContactImage = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contact = await Contacts.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    const imageArray = contact.images;
    imageArray.splice(imageArray.indexOf(req.query.imageURI), 1);

    const updatedContact = await contact.update({
      images: imageArray.length === 0 ? null : imageArray
    });
    res.json(updatedContact);
  } catch (err) {
    console.error(err);
  }
}
