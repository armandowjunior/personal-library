"use strict";
require("../connection");
const Book = require("..//models").Book;

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      Book.find({}).exec((err, books) => {
        if (err) return res.json({ error: err });
        res.json(books);
      });
    })

    .post(function (req, res) {
      let title = req.body.title;

      if (!title) return res.send("missing required field title");

      const newBook = new Book({
        title,
        commentcount: 0,
      });

      newBook.save((err, book) => {
        if (err || !book) {
          return res.json({ error: err });
        }
        res.json({
          _id: book._id,
          title,
        });
      });
    })

    .delete(function (req, res) {
      Book.remove({}, (err, books) => {
        if (err || !books) return res.json({ error: err });
        res.send("complete delete successful");
      });
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;

      Book.findById(bookid).exec((err, book) => {
        if (err || !book) return res.send("no book exists");
        res.json(book);
      });
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;

      if (!comment) return res.send("missing required field comment");

      Book.findById(bookid, (err, book) => {
        if (err || !book) return res.send("no book exists");

        book.comments.push(comment);
        book.commentcount = book.comments.length;

        book.save((err, updatedBook) => {
          if (err) return res.json({ error: err });

          res.json(updatedBook);
        });
      });
    })

    .delete(function (req, res) {
      let bookid = req.params.id;

      Book.findByIdAndDelete(bookid, (err, book) => {
        if (err || !book) return res.send("no book exists");

        res.send("delete successful");
      });
    });
};
