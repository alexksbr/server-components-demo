/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState} from 'react';

import NotePreview from './NotePreview';
import {useLocationMutation, useLocationNavigation} from './util';

interface NoteEditorProps {
    noteId: number | null;
    initialTitle: string;
    initialBody: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
    noteId,
    initialTitle,
    initialBody,
}) => {
    const {isNavigating, navigate, location} = useLocationNavigation();
    const [title, setTitle] = useState(initialTitle);
    const [body, setBody] = useState(initialBody);
    const {isSaving, performMutation: saveNote} = useLocationMutation({
        endpoint: noteId !== null ? `/notes/${noteId}` : `/notes`,
        method: noteId !== null ? 'PUT' : 'POST',
    });
    const {
        isSaving: isDeleting,
        performMutation: deleteNote,
    } = useLocationMutation({
        endpoint: `/notes/${noteId}`,
        method: 'DELETE',
    });

    async function handleSave() {
        const payload = {title, body};
        const requestedLocation = {
            selectedId: noteId,
            isEditing: false,
            showStatistics: location.showStatistics,
        };
        const response = await saveNote(payload, requestedLocation);

        if (!response) {
            throw new Error(`Something went wrong when saving note ${noteId}`);
        }

        navigate(response);
    }

    async function handleDelete() {
        const payload = {};
        const requestedLocation = {
            selectedId: null,
            isEditing: false,
            showStatistics: location.showStatistics,
        };
        const response = await deleteNote(payload, requestedLocation);

        if (!response) {
            throw new Error(
                `Something went wrong when deleting note ${noteId}`
            );
        }

        navigate(response);
    }

    const isDraft = noteId === null;
    return (
        <div className="note-editor">
            <form
                className="note-editor-form"
                autoComplete="off"
                onSubmit={(e) => e.preventDefault()}>
                <label className="offscreen" htmlFor="note-title-input">
                    Enter a title for your note
                </label>
                <input
                    id="note-title-input"
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <label className="offscreen" htmlFor="note-body-input">
                    Enter the body for your note
                </label>
                <textarea
                    id="note-body-input"
                    value={body}
                    onChange={(e) => {
                        setBody(e.target.value);
                    }}
                />
            </form>
            <div className="note-editor-preview">
                <div className="note-editor-menu" role="menubar">
                    <button
                        className="note-editor-done"
                        disabled={isSaving || isNavigating}
                        onClick={() => handleSave()}
                        role="menuitem">
                        <img
                            src="checkmark.svg"
                            width="14px"
                            height="10px"
                            alt=""
                            role="presentation"
                        />
                        Done
                    </button>
                    {!isDraft && (
                        <button
                            className="note-editor-delete"
                            disabled={isDeleting || isNavigating}
                            onClick={() => handleDelete()}
                            role="menuitem">
                            <img
                                src="cross.svg"
                                width="10px"
                                height="10px"
                                alt=""
                                role="presentation"
                            />
                            Delete
                        </button>
                    )}
                </div>
                <div className="label label--preview" role="status">
                    Preview
                </div>
                <h1 className="note-title">{title}</h1>
                <NotePreview body={body} />
            </div>
        </div>
    );
};

export default NoteEditor;
