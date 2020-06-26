const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/favorites", async (req, res) => {
    try {
        if (req.user) {
            const data = await db.fav.findAll({
                where: {
                    user_id : req.user.id
                }
            });
            // console.log(data);
            const fav = {
                favs:data
            };
            res.render("favorites", fav);
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.error(error);

        res.status(500).send();
    }
});

  router.get("/api/favorites", async (req, res) => {
    try {
      const data = await db.fav.findAll({ include: [db.user] });

      res.json(data);

    } catch (error) {
      console.error(error);

      res.status(500).send();
    }
  });

router.post("/api/favorites", async (req, res) => {
    // console.log(req.body);
try {
    const fav = req.body;
    // fav.user = [{id: fav.user_id, "db.bridge": {selfGranted:true}}];
    // console.log(fav);
    
    const data = await db.fav.create(fav);

    res.json(data);

} catch (error) {
    console.error(error);

    res.status(500).send();
  }
}


);

router.get("/api/favorites/:id", async (req, res) => {
    try {
      const data = await db.fav.findOne({
        where: {
          id: req.params.id
        },
        include: [db.user]
      });
  
      res.json(data);
  
    } catch (error) {
      console.log(error);
  
      res.status(500).send();
    }
  });

router.delete("/api/favorites/:id", async (req, res) => {
    try {
      const data = await db.fav.destroy({
        where: {
          id: req.params.id
        }
      });
  
      res.json(data);
  
    } catch (error) {
      console.log(error);
  
      res.status(500).send();
    }
  });

module.exports = router;
