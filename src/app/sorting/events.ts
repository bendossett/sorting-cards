export interface UpdateEvent {
    index: number;
    type: string;
    value: string | number;
}

export interface DeleteEvent {
    index: number;
    type: string;
}