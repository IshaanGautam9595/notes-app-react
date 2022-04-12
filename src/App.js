import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import NotesList from './components/NotesList'
import { SortbyNewestFirst, SortbyOldestFirst } from './components/sorting';
import Search from './components/Search';

const App = () => {
  
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: 'This is first',
      date: '12/04/2022',
    },
    {
      id: nanoid(),
      text: 'This is second',
      date: '12/04/2022',
    },
    {
      id: nanoid(),
      text: 'This is third',
      date: '12/04/2022',
    },
    {
      id: nanoid(),
      text: 'This is fourth',
      date: '12/04/2022',
    },
  ]);

  const [NewNote, setNewNote] = useState();
  const [SortingValue, setSortingValue] = useState("default");  
  const handleSorting = (e) => {
    setSortingValue(e.target.value);
    console.log(e.target.value, SortingValue);
    switch (e.target.value) {
      case "newestFirst":
        setNewNote(SortbyNewestFirst(NewNote));
        break;
      case "oldestFirst":
        setNewNote(SortbyOldestFirst(NewNote));
        break;
      default:
        setNewNote(notes);
    }
    };

 const [searchText, setSearchText] = useState('');
 
 useEffect(() => {
  const savedNotes = JSON.parse(
    localStorage.getItem('react-notes-app-data')
  );

  if (savedNotes) {
    setNotes(savedNotes);
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    'react-notes-app-data',
    JSON.stringify(notes)
  );
}, [notes]);


  const addNote = (text) => {
    const date = new Date();
  const newNote = {
    id: nanoid(),
    text: text,
    date: date.toLocaleDateString(),
  }
  const newNotes = [...notes, newNote];
  setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className="container">
      <h1>Notes</h1>
      <Search handleSearchNote={setSearchText} />
      <select onChange={handleSorting} style={{ width: "130px", height: "50px" }}>
        <option value="default">Default</option>
        <option value="newestFirst">Newest First</option>
        <option value="oldestFirst">Oldest First</option>
      </select>
      <NotesList 
      notes = {notes.filter((note) => 
        note.text.toLowerCase().includes(searchText)
      )} 
      handleAddNote = {addNote}
      handleDeleteNote = {deleteNote}
      />
    </div>
  )
}

export default App;