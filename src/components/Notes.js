import React, { useEffect } from "react";
import noteContext from "../contexts/notes/notesContext";
import { useContext } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useState } from "react";

function Notes() {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
  }, []);
  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentnote) => {
    setNote({
      eid: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    editNote( note.eid,note.etitle, note.edescription, note.etag );
  };
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <AddNote />

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit this Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <br />
                  <input
                    value={note.etitle}
                    onChange={onChange}
                    type="text"
                    name="etitle"
                    className="etitle"
                    id="etitle"
                    aria-describedby="etitle"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="edescription">
                    Description
                  </label>
                  <br />
                  <textarea
                    value={note.edescription}
                    onChange={onChange}
                    type="text"
                    name="edescription"
                    id="edescription"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="etag">
                    tag
                  </label>
                  <br />
                  <input
                  value={note.etag}
                    className="form-control-sm"
                    onChange={onChange}
                    type="etext"
                    name="etag"
                    id="etag"
                  />
                </div>
                <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
                <button
                  disabled={note.etitle.length<3 || note.edescription.length<10}
                  type="submit"
                  onClick={handleClick}
                  className="btn btn-primary" data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </form>
            </div>
            <div className="modal-footer">
              
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes</h2>
        {notes.length > 0 ? (
          notes.map((note) => <Noteitem key={note._id} updateNote={updateNote} note={note} />)
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </div>
  );
}

export default Notes;
