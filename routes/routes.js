const express = require("express");
const nSideModel = require("../models/model_n");
const oneSideModel = require("../models/model_1");

const router = express.Router();

router.post("/", async (req, res) => {
  const data = new nSideModel({
    name: req.body.name,
    foreignKey: req.body.foreignKey,
  });

  try {
    const dataToSave = await data.save();
    res.status(201).json({ _id: dataToSave._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await oneSideModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await nSideModel
      .find({ foreignKey: req.params.id })
      .populate("foreignKey", "-_id");
    if (data.length !== 0) {
      res.json(data);
    } else {
      res
        .status(404)
        .json({ message: "Ebben a hegységben nem találtam kilátót." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true, runValidators: true };
    // hogy a frissítés utáni dokumentumot kapjuk vissza
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    if (result) {
      res.send(result);
    } else {
      res
        .status(400)
        .json({ message: `${id} azonosítóval nem létezik kilátó!` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
