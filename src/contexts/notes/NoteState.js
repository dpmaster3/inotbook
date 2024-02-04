import React from "react";
import noteContext from "./notesContext";
import { useState } from "react";

const NoteState=(props)=>{
  
  const host="https://iNote-api.onrender.com";
  const notesInitial=[]
const [notes,setNotes]=useState(notesInitial)



//add note
const addNote=async(title,description,tag)=>{

   //Todo api call
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },
    
    body: JSON.stringify({title,description,tag}), 
  });
  const note =response.json();
  
    
    setNotes(notes.concat(note))
}
//Get all Notes
const getNotes= async()=>{
  try {
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },
  });
  const json =await response.json();
  console.log(json)
  setNotes(json);
} catch (error) {
  console.error('Error fetching notes:', error);
    
  }
}

//delete note
const deleteNote= async(id)=>{
  const response = await fetch(`${host}/api/notes/delete/${id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
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
      "auth-token": localStorage.getItem('token')
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