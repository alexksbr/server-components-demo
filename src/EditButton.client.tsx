/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useTransition} from 'react';

import {useLocation} from './LocationContext.client';

interface EditButtonProps {
    noteId: number | null;
}

const EditButton: React.FC<EditButtonProps> = ({noteId, children}) => {
    const {setLocation} = useLocation();
    const [isPending, startTransition] = useTransition();
    const isDraft = noteId == null;
    return (
        <button
            className={[
                'button',
                isDraft ? 'edit-button--solid' : 'edit-button--outline',
            ].join(' ')}
            disabled={isPending}
            onClick={() => {
                startTransition(() => {
                    setLocation &&
                        setLocation((loc) => ({
                            selectedId: noteId,
                            isEditing: true,
                            showStatistics: loc.showStatistics,
                        }));
                });
            }}
            role="menuitem">
            {children}
        </button>
    );
};

export default EditButton;
