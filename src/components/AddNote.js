import React, { useContext, useState } from "react";
import noteContext from "../contexts/notes/notesContext";

const AddNote = () => {
    const context = useContext(noteContext);
    
     const { addNote } = context;
  
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <br />
            <input
            value={note.title}
              onChange={onChange}
              type="text"
              name="title"
              className="title"
              id="title"
              aria-describedby="title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="description">
              Description
            </label>
            <br />
            <textarea
            className="wd-6"
              value={note.description}
              onChange={onChange}
              type="text"
              name="description"
              id="description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="tag">
              tag
            </label>
            <br />
            <input
            value={note.tag}
              className="form-control-sm"
              onChange={onChange}
              type="text"
              name="tag"
              id="tag"
            />
          </div>
          
          <button
            disabled={note.title.length<3 || note.description.length<10}
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
