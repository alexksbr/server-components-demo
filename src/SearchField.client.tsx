/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState, useTransition} from 'react';

import {useLocation} from './LocationContext.client';
import Spinner from './Spinner';

const SearchField: React.FC = () => {
    const [text, setText] = useState('');
    const [isSearching, startSearching] = useTransition();
    const {setLocation} = useLocation();
    return (
        <form
            className="search"
            role="search"
            onSubmit={(e) => e.preventDefault()}>
            <label className="offscreen" htmlFor="sidebar-search-input">
                Search for a note by title
            </label>
            <input
                id="sidebar-search-input"
                placeholder="Search"
                value={text}
                onChange={(e) => {
                    const newText = e.target.value;
                    setText(newText);
                    startSearching(() => {
                        setLocation &&
                            setLocation((loc) => ({
                                selectedId: loc.selectedId,
                                isEditing: loc.isEditing,
                                searchText: newText,
                            }));
                    });
                }}
            />
            <Spinner active={isSearching} />
        </form>
    );
};

export default SearchField;
