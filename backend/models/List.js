const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  title: { type: String, trim: true, minlength: 4, required: true },
  archived: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const List = mongoose.model("List", ListSchema);

module.exports = List;
