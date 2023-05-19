const { Router } = require("express"); // import Router from express
const {ReceivingChatMessage} = require("../models/Chat"); // import Profile model
const { isLoggedIn } = require("./middleware"); // import isLoggedIn custom middleware

const router = Router();

router.get("/", isLoggedIn, async (req, res) => {
    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
    // get id from params
    //send target todo
    res.json(
      await ReceivingChatMessage.find({ username }).catch((error) =>
        res.status(400).json({ error })
      )
    );
  });

  module.exports = router;