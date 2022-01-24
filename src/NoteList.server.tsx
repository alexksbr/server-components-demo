/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {db} from './db.server';
import ClientNoteList from './NoteList.client';
import {SerializedNote} from './types';

interface NoteListProps {
  searchText: string;
  filterFavorites: boolean;
  noteListOffset: number;
}

const NoteList: React.FC<NoteListProps> = ({
  searchText,
  filterFavorites,
  noteListOffset,
}) => {
  // const notes = fetch('http://localhost:4000/notes').json();

  // WARNING: This is for demo purposes only.
  // We don't encourage this in real apps. There are far safer ways to access
  // data in a real application!
  const query = filterFavorites
    ? `select * from notes where title ilike $1 AND favorite=true order by id desc OFFSET ${noteListOffset} FETCH NEXT 7 ROWS ONLY`
    : `select * from notes where title ilike $1 order by id desc OFFSET ${noteListOffset} FETCH NEXT 7 ROWS ONLY`;

  const notes: SerializedNote[] = db
    .query(query, ['%' + searchText + '%'])
    .rows.map((note) => ({
      ...note,
      updated_at: note.updated_at.toString(),
      created_at: undefined,
    }));

  // Now let's see how the Suspense boundary above lets us not block on this.
  // fetch('http://localhost:4000/sleep/3000');

  return (
    <ClientNoteList
      notes={notes}
      searchText={searchText}
      noteListOffset={noteListOffset}
    />
  );
};

export default NoteList;
