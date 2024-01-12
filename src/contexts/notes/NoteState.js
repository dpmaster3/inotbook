import React from "react";
import noteContext from "./notesContext";
import { useState } from "react";

const NoteState=(props)=>{
  const host="http://localhost:5000";
  const notesInitial=[]
const [notes,setNotes]=useState(notesInitial)



//add note
const addNote=async(title,description,tag)=>{

   //Todo api call
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZDdiZTEzZTI0YWQxZGFmZmFjMmZmIn0sImlhdCI6MTcwNDgxOTY4MX0.ZnYwHwJUN-UVo-bh7XPHVrrJPv024uAPw6JVd6asFho"
    },
    
    body: JSON.stringify({title,description,tag}), 
  });
  const json =response.json();
  console.log(json)
    const note={
        "_id": "6596fad7a6c48724c0124fe0",
      "user": "6595a9bcc19fd6d7b9926aec",
      "title": title,
      "description": description,
      "tag": tag,
      "__v": 0
    };
    setNotes(notes.concat(note))
}
//Get all Notes
const getNotes= async()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZDdiZTEzZTI0YWQxZGFmZmFjMmZmIn0sImlhdCI6MTcwNDgxOTY4MX0.ZnYwHwJUN-UVo-bh7XPHVrrJPv024uAPw6JVd6asFho"
    },
  });
  const json =await response.json();
  console.log(json)
  setNotes(json);
}

//delete note
const deleteNote= async(id)=>{
  const response = await fetch(`${host}/api/notes/delete/${id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZDdiZTEzZTI0YWQxZGFmZmFjMmZmIn0sImlhdCI6MTcwNDgxOTY4MX0.ZnYwHwJUN-UVo-bh7XPHVrrJPv024uAPw6JVd6asFho"
    }, 
  });
  const json =response.json(); 
  console.log(json)
    console.log("Deleting note with id "+ id)
    const updatedNotes = notes.filter((note) => note._id !== id);
    setNotes(updatedNotes);
}

//edit note
const editNote= async(id,title,description,tag)=>{
  //API CALL
  const response = await fetch(`${host}/api/notes/update/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZDdiZTEzZTI0YWQxZGFmZmFjMmZmIn0sImlhdCI6MTcwNDgxOTY4MX0.ZnYwHwJUN-UVo-bh7XPHVrrJPv024uAPw6JVd6asFho"
    },
    
    body: JSON.stringify({title,description,tag}), 
  });
  const json = await response.json(); 
  console.log(json)

  let newNotes=JSON.parse(JSON.stringify(notes))

  for(let i=0;i<notes.length;i++){
    if(id===notes[i]._id){
      newNotes[i].title=title;
      newNotes[i].description=description;
      newNotes[i].tag=tag;
      break;
    }
  }
  setNotes(newNotes);
    
}
    return(
        <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,getNotes,editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;