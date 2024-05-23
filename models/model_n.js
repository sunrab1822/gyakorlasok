const mongoose = require("mongoose");

function customValidator(num) {
  return num % 1000 == 0;
}

const nSideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [50, "Name can not be more than 50 characters!"],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  createdAt: {
    type: Date,
    max: [Date.now, "createAt can not be greater than actual date"],
  },
  number: {
    type: Number,
    validate: [
      customValidator,
      "A number-nek 1000-rel oszthatónak kell lennie!",
    ],
  },
  foreignKey: {
    type: Number,
    required: true,
    ref: "oneSideModel",
  },
});

module.exports = mongoose.model("nSideModel", nSideSchema, "nCollectionName"); // ezzel a névvel lesz létrehozva a kollekció.
