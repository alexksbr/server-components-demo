import {ReactNode} from 'react';

export interface ILocation {
    selectedId: number | null;
    isEditing: boolean;
    showStatistics: boolean;
}

export interface ISidebarLocation {
    searchText: string;
    filterFavorites: boolean;
}

export type LocationCache = Map<string, Response>;

export interface DbPool {
    query: (sql: string, args: string[]) => {rows: Note[]};
}

export interface Note {
    id: number;
    title: string;
    body: string;
    favorite: boolean;
    updated_at: Date;
}

export interface Response {
    readRoot: () => ReactNode;
}
