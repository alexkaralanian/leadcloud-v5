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
    console.log("LISTING", listing);

    res.json(listing);
  } catch (err) {
    console.error(err);
  }
};

exports.create = async (req, res) => {
  console.log("CREATE LISTING", req.body);
  const userId = req.session.user.toString();
  try {
    req.body.updated = Date.now();
    req.body.UserUuid = userId;
    const createdListing = await Listings.create(req.body);
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
