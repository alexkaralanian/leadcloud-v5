const Sequelize = require("sequelize");
const Listings = require("../db/models").listings;
const moment = require("moment");

const Op = Sequelize.Op;

exports.getAll = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    let listings;
    if (req.query.query) {
      listings = await Listings.findAndCountAll({
        limit: req.query.limit,
        offset: req.query.offset,
        where: {
          UserUuid: userId,
          [Op.and]: {
            address: {
              [Op.iLike]: `%${req.query.query}%`
            }
          }
        },
        order: [["updatedAt", "DESC"]]
      });
      res.json(listings);
    } else {
      listings = await Listings.findAndCountAll({
        limit: req.query.limit,
        offset: req.query.offset,
        where: {
          UserUuid: userId
        },
        order: [["updatedAt", "DESC"]]
      });
      res.json(listings);
    }
  } catch (err) {
    console.error(err);
  }
};

exports.getOne = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const listing = await Listings.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });

    res.json(listing);
  } catch (err) {
    console.error(err);
  }
};

exports.create = async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const createdListing = await Listings.create({
      UserUuid: userId,
      address: req.body.address,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      description: req.body.description,
      updated: moment(Date.now()).toISOString(),
      listingContacts: []
    });
    res.json(createdListing.dataValues);
  } catch (err) {
    console.error(err);
  }
};

exports.update = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const listing = await Listings.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    const updatedListing = await listing.update(req.body);
    res.json(updatedListing);
  } catch (err) {
    console.error(err);
  }
};

exports.delete = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const listing = await Listings.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    await listing.destroy();
    res.json({
      message: "Listing Deleted Successfully"
    });
  } catch (err) {
    console.error(err);
  }
};
