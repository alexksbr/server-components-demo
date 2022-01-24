import {Note, SerializedNote} from './types';
import {useEffect, useState} from 'react';
import SidebarNote from './SidebarNote';

interface ClientNoteListProps {
  notes: SerializedNote[];
  searchText: string;
  noteListOffset: number;
}

const ClientNoteList: React.FC<ClientNoteListProps> = ({
  notes,
  searchText,
  noteListOffset,
}) => {
  const [noteState, setNoteState] = useState<Note[]>([]);

  function deserializeNote(note: SerializedNote): Note {
    return {...note, updated_at: new Date(note.updated_at)};
  }

  useEffect(() => {
    setNoteState((currentNotes) =>
      currentNotes.concat(notes.map((note) => deserializeNote(note)))
    );
  }, [noteListOffset]);

  return noteState.length > 0 ? (
    <ul className="notes-list">
      {noteState.map((note) => (
        <li key={note.id}>
          <SidebarNote note={note} />
        </li>
      ))}
    </ul>
  ) : (
    <div className="notes-empty">
      {searchText
        ? `Couldn't find any notes titled "${searchText}".`
        : 'No notes created yet!'}{' '}
    </div>
  );
};

export default ClientNoteList;
