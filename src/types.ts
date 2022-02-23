import {ReactNode} from 'react';

/*  🖌 TODO: currently we are not able to know whether we should display a statistics page. Add another variable to the ILocation and fix the occuring problems. 🤓
    Also make sure to check usages of useLocation and useMutation as the app state can be modified by these hooks! Finally, don't forget to update api.server.ts ☝️
 */
export interface ILocation {
    selectedId: number | null;
    isEditing: boolean;
    searchText: string;
}

export type LocationCache = Map<string, Response>;

export interface DbPool {
    query: (sql: string, args: string[]) => {rows: Note[]};
}

export interface Note {
    id: number;
    title: string;
    body: string;
    updated_at: Date;
}

export interface Response {
    readRoot: () => ReactNode;
}
