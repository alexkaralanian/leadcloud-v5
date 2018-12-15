const isEmpty = require("lodash.isempty");
const Sequelize = require("sequelize");
const Groups = require("../db/models").groups;

const Op = Sequelize.Op;

exports.getAll = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const groups = await Groups.findAndCountAll({
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        UserUuid: userId,
        [Op.and]: {
          title: {
            [Op.iLike]: `%${req.query.query}%`
          }
        }
      },
      order: [["updatedAt", "DESC"]]
    });
    res.json(groups);
  } catch (err) {
    console.error("FETCHING GROUPS ERROR", err);
  }
};

exports.getOne = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const group = await Groups.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    res.json(group);
  } catch (err) {
    console.error("FETCHING GROUP ERROR", err.response);
  }
};

exports.create = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const groups = await Groups.findAll({
      where: {
        UserUuid: userId,
        title: {
          [Op.iLike]: req.body.title
        }
      }
    });
    if (isEmpty(groups)) {
      const createdGroup = await Groups.create({
        UserUuid: userId,
        title: req.body.title
      });
      res.json(createdGroup.dataValues);
    } else {
      res.json(groups[0].dataValues);
    }
  } catch (err) {
    console.error("ERROR CREATING GROUP", err);
  }
};

exports.update = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const group = await Groups.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    const updatedGroup = await group.update(req.body);
    res.json(updatedGroup);
  } catch (err) {
    console.error(err);
  }
};

exports.delete = async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const group = await Groups.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    group.destroy();
    res.json({
      message: "Group Deleted Successfully"
    });
  } catch (err) {
    console.error(err);
  }
};
