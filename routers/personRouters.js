const express = require("express");
const router = express.Router();
const person = require("./../models/person");
const { jwtAuthMiddlewate, generateToken } = require("./../jwt");

// post route to add a person
router.post("/sinup", async (req, res) => {
  try {
    const data = req.body; //assuming the request body cantains the person data

    // create a new person document usinng the mongoose model

    const newPerson = new person(data);

    //save the new person to the database
    const responce = await newPerson.save();
    console.log("data saved");
    // Token generate
    const playload = {
      id: responce.id,
      username: responce.username,
    };

    const token = generateToken(playload);

    res.status(200).json({ responce: responce, token: token });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "internal sever error" });
  }
});
// profile routes
router.get("/profile", jwtAuthMiddlewate, async (req, res) => {
  try {
    const userData = req.user;
    
    const userId = userData.id;
   
    const user = await person.findById(userId);
 
    res.status(200).json({user});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal sever error" });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    // extract the user name and password
    const { username, password } = req.body;
    // find the user by username
    const user = await person.findOne({
      username :username
    });
    console.log(user, "43");
    // if user does not exist or password does not match ,return error
    // const compare = await user.comparePassword(password)
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "check username or password" });
    }

    // generate token by payload
    const playload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(playload);
    res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// get all persons
router.get("/", jwtAuthMiddlewate, async (req, res) => {
  try {
    const data = await person.find();
    console.log("data fatched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal sever error" });
  }
});
// now to fatch data for particular work type paramatarize work

router.get("/:work", async (req, res) => {
  try {
    const workType = req.params.work;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const responce = await person.find({ work: workType });
      console.log("data fatched");
      res.status(200).json(responce);
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " internal server error" });
  }
});
// for update
router.put("/:id", async (req, res) => {
  try {
    const personID = req.params.id; // extract the id from the url paramenter
    const updatedPersonData = req.body; //Updated data from the person

    const responce = await person.findByIdAndUpdate(
      personID,
      updatedPersonData,
      {
        new: true, // return  updated document
        runValidators: true, // run mongoos validation
      }
    );
    if (!responce) {
      return res.status(404).json({ error: "person not found   " });
    }
    console.log("data updated ");
    res.status(200).json(responce);
  } catch (error) {
    console.log("internal server error ");
    res.status(500).json({ error: "internal server error" });
  }
});
//  api for  delete

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    // const updatedID = req.body;

    const responce = await person.findByIdAndDelete(personId);
    if (!responce) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data deleted");
    res.status(200).json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});
module.exports = router;
