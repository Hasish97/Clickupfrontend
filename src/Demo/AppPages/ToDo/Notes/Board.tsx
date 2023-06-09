import React, { Component } from "react";
import Note from "./Note";
const newNoteText = "New note :-)";
const newNoteButtonText = "ADD NEW NOTE";
interface NoteDataType {
  id?: number;
  note: string;
  position: boolean;
}
const initialNotes = [
  {
    note: "Industry's standard dummy text ever since the 1500s",
    position: false
  },
  {
    note:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    position: false
  },
  {
    note: "The point of using Lorem Ipsum is that it has a more-or-less",
    position: false
  },
  {
    note:
      "A collection of textile samples lay spread out on the table One morning, when Gregor Samsa woke from troubled.",
    position: false
  },
  {
    note: "There are many variations of passages of Lorem Ipsum",
    position: false
  }
];
type BoardState = {
  notes: NoteDataType[]
};
export default class Board extends Component<{}, BoardState> {
  uniqueId: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      notes: []
    };
  }
  UNSAFE_componentWillMount() {
    // Get notes from local storage
    const notes = JSON.parse(localStorage.getItem("notesStorage")) || [];
    if (notes.length > 0) {
      notes.map((single: any) => {
        this.add(single.note, single.position);
        return false;
      });
    } else {
      initialNotes.map(single => {
        this.add(single.note, single.position);
        return false;
      });
    }
  }
  // Save to localStorage
  saveToStorage(notes: NoteDataType[]) {
    this.setState({ notes });
    localStorage.setItem("notesStorage", JSON.stringify(notes));
  }
  // Get next ID
  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }
  // Add note to localStorage and state
  add(text: string, position: boolean) {
    const { notes } = this.state;
    notes.push({
      id: this.nextId(),
      note: text,
      position
    });
    this.saveToStorage(notes);
  }
  // Update note text
  update(newText: string, i: number) {
    const { notes } = this.state;
    notes[i].note = newText;
    this.saveToStorage(notes);
  }
  // Update note position
  updatePosition(position: boolean, i: number) {
    const { notes } = this.state;
    notes[i].position = position;
    this.saveToStorage(notes);
  }
  // Remove note
  remove(i: number) {
    const { notes } = this.state;
    notes.splice(i, 1);
    this.saveToStorage(notes);
  }
  // Render Notes
  renderNotes(note: NoteDataType, i: number) {
    return (
      <Note
        key={note.id}
        index={i}
        position={note.position as any}
        onChange={this.update.bind(this)}
        onDrag={this.updatePosition.bind(this)}
        onRemove={this.remove.bind(this)}
      >
        {note.note}
      </Note>
    );
  }
  onDragOver(e: any) {
    e.preventDefault();
  }
  onDrop(e: any) {
    let noteId = e.dataTransfer.getData("application/x-note");
    let position = { xPos: e.clientX, yPos: e.clientY };
    this.updatePosition(position as any, noteId);
  }
  render() {
    const { notes } = this.state;
    return (
      <div
        className="board"
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => this.onDrop(e)}
      >
        <header className="main-header">
          <div
            className="main-header__text fadein"
            onClick={this.add.bind(this, newNoteText, false)}
          >
            {newNoteButtonText}
          </div>
        </header>
        {notes.map(this.renderNotes.bind(this))}
      </div>
    );
  }
}
