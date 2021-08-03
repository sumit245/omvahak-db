const express = require("express");
const router = express.Router();
const Users = require("../models/users.model");
router.route("/").get(function (req, res) {
  Users.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

/* User Authentication */
router.post("/login", function (req, res, next) {
    console.log("req.body -> ", req.body);
    Users.find(function(err,users){
        if(err){
            console.log(err)
        }else{
            let newUsers = users.filter(function (e) {
                return e.email == req.body.email && e.password == req.body.password;
              });
              if (newUsers.length > 0) {
                res.send({ status: "success", data: newUsers[0], msg: "" });
              } else {
                res.send({ status: "failed", data: {}, msg: "No UserId / Password Found" });
              }
        }
    })
    
  });
  

router.route("/").post(function (req, res) {
  let user = new Users(req.body);
  user
    .save()
    .then((user) => user)
    .then((user) => {
      res.status(200).json({ user: "Done..." });
      res.send(user);
    })
    .catch((err) => {
      res.status(400).send("adding new Client failed");
    });
});
//save a singe user to database

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Users.findById(id, function (err, user) {
    res.json(user);
  });
});
//get specific user

// router.route("/:id").put(function (req, res) {
//   Users.findByIdAndUpdate(req.params.id, req.params.body, function (err, user) {
        
//           })
//           .catch((err) => {
//             res.status(400).send("Update not possible");
//           });
//   });
// });
//update a user

router.route("/:id").delete((req, res, next) => {
  Users.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
});
//delete a user

module.exports = router;
