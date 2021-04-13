const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  comments: [String],
  title: {
    type: String,
    required: true,
  },
  commentcount: Number,
});

const Book = mongoose.model("Book", bookSchema);

exports.Book = Book;
