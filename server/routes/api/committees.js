const db = require("../../db/models");
const router = require("express").Router();
const passport = require("../../db/config/passport");
const isAuthenticated = require("../../db/config/middleware/isAuthenticated");
const Sequelize = require("sequelize");
const Op = Sequelize.Op

router.route("/")
    .get(function(req, res){
        db.Committee.findAll({})
            .then(committeData =>{
                res.send(committeData)
            })
    })
router.route("/queried/:query")
    .get(function(req, res){
        console.log(req.params.query)
        db.Committee.findAll({
            attributes: ['id'],
            where: {
                name: {
                    [Op.like]: `%${req.params.query}%`
                }
            }
        })
        .then(queriedCommittees =>{
            console.log(queriedCommittees)
            res.send(queriedCommittees)
        })
    })
router.route("/:name")
    .get(function(req, res){
        db.Committee.findOne({
            where:{
                name: req.params.name
            }
        }).then(committeData => {
            res.send(committeData) 
        })
    })
router.route("/add")
    .post(function (req, res){
        db.Committee.create(req.body)
        .then(committeeObj =>{
            res.send(committeeObj)
        })
    })

module.exports = router;