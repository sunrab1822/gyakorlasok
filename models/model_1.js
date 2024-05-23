const mongoose = require("mongoose");

const oneSideSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  oneSideName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [30, "A név nem tartalmazhat 30 karakternél többet!"],
  },
});

module.exports = mongoose.model(
  "oneSideModel",
  oneSideSchema,
  "oneCollectionName"
);
