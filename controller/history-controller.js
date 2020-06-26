const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/api/histories", async (req, res) => {
  const data = await db.history.findAll({ include: [db.user] });

  res.json(data);
});

router.get("/api/histories/:id", async (req, res) => {
  const data = await db.history.findAll({ where: { id: req.params.id }, include: [db.user] });

  res.json(data);
});

router.post("/api/histories", async (req, res) => {
  const data = await db.history.create(req.body);

  res.json(data);
});

router.delete("/api/histories/:id", async (req, res) => {
  const data = await db.history.destroy({ where: { id: req.params.id } });

  res.json(data);
});

module.exports = router;
