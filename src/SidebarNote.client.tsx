/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState, useRef, useEffect, useTransition, ReactElement} from 'react';

import {useLocation} from './LocationContext.client';
import {
  useLocationMutation,
  useLocationNavigation,
  useFilterSettingsNavigation,
  useFilterSettingsMutation,
} from './util';
import {IFilterSettings} from './types';
import {useFilterSettings} from './FilterSettingsContext.client';

interface SidebarNoteProps {
    id: number;
    title: string;
    favorite: boolean;
    expandedChildren: ReactElement;
}

const SidebarNote: React.FC<SidebarNoteProps> = ({
    id,
    title,
    favorite,
    children,
    expandedChildren,
}) => {
    const {isNavigating, navigate} = useFilterSettingsNavigation();
    const {location, setLocation} = useLocation();
  const {filterSettings, setFilterSettings} = useFilterSettings();
    const [isPending, startTransition] = useTransition();
    const [isExpanded, setIsExpanded] = useState(false);
    const isActive = id === location.selectedId;

    // Animate after title is edited.
    const itemRef = useRef<HTMLDivElement>(null);
    const prevTitleRef = useRef(title);
    useEffect(() => {
        if (title !== prevTitleRef.current) {
            prevTitleRef.current = title;
            itemRef.current && itemRef.current.classList.add('flash');
        }
    }, [title]);

    const {performMutation: updateNote, isSaving} = useFilterSettingsMutation({
        endpoint: `/notes/${id}`,
        method: 'PUT',
    });

  async function toggleFavorite() {
    const payload = {favorite: !favorite};
    const newFilterSettings: IFilterSettings = {
      filterFavorites: filterSettings.filterFavorites,
      searchText: filterSettings.searchText,
    };
    const response = await updateNote(payload, newFilterSettings);

        if (!response) {
            throw new Error(`Something went wrong when saving note ${id}`);
        }

        navigate(response);
    }

    return (
        <div
            ref={itemRef}
            onAnimationEnd={() => {
                itemRef.current && itemRef.current.classList.remove('flash');
            }}
            className={[
                'sidebar-note-list-item',
                isExpanded ? 'note-expanded' : '',
            ].join(' ')}>
            {children}
            <button
                className="sidebar-note-open"
                style={{
                    backgroundColor: isPending
                        ? 'var(--gray-80)'
                        : isActive
                        ? 'var(--tertiary-blue)'
                        : '',
                    border: isActive
                        ? '1px solid var(--primary-border)'
                        : '1px solid transparent',
                }}
                onClick={() => {
                    startTransition(() => {
                        setLocation &&
                            setLocation((loc) => ({
                                selectedId: id,
                                isEditing: false,
                                showStatistics: false,
                            }));
                    });
                }}>
                Open note for preview
            </button>
            <button
                className="sidebar-note-toggle-expand"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}>
                {isExpanded ? (
                    <img
                        src="chevron-down.svg"
                        width="10px"
                        height="10px"
                        alt="Collapse"
                    />
                ) : (
                    <img
                        src="chevron-up.svg"
                        width="10px"
                        height="10px"
                        alt="Expand"
                    />
                )}</button>
      <button
        className="sidebar-note-toggle-favorite"
        onClick={toggleFavorite}
        disabled={isNavigating || isSaving}
        style={{
          opacity: isNavigating || isSaving ? '0.5' : '1.0',
        }}>
                <img
                    src={favorite ? 'star-fill.svg' : 'star-line.svg'}
                    width="20px"
                    height="20px"
                    alt="Expand"
                />
            </button>
            {isExpanded && expandedChildren}
        </div>
    );
};

export default SidebarNote;
