import React, { useContext} from "react";
import noteContext from "../contexts/notes/notesContext";


const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {showAlert}=props 
  const { deleteNote } = context;  
  const { note,updateNote } = props;

  return (
    <div>
      <div className="card col-md-3 my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-regular fa-trash-can mx-3" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-3" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
