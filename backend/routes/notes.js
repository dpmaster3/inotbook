const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes.js");
const getuser = require("../middleware/getuser.js");
//Route 1: Get all notes
router.get("/fetchallnotes", getuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Internal server error occurred");
  }
});
//Route 2: Add note
router.post(
  "/addnote",
  getuser,
  [
    body("title", "Enter title").isLength({ min: 3 }).escape(),
    body("description", "Enter description").isLength({ min: 10 }).escape(),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();

      res.json(savednote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Internal server error occurred");
    }
  }
);
//Route 3: Update exsisting note
router.put("/update/:id", getuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //create new note
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find note to be updateded and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: "Not found!" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send({ error: "Not Allowed" });
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Internal server error occurred");
  }
});

//Route 4: Delete note
router.delete("/delete/:id", getuser, async (req, res) => {
  try {
    //find note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: "Not found!" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send({ error: "Not Allowed" });
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: "Success has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Internal server error occurred");
  }
});

module.exports = router;
