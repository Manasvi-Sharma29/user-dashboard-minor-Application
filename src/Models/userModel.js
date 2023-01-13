const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 15,
  },
  codedPassword: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
});
