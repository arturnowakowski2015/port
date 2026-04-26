import type { Message } from "./messagesApi";

export type AppState = {
    newContent: string;
    newError: string;
    editingMessage: Message | null;
    editContent: string;
    editError: string;
};

export type AppAction =
    | { type: "setNewContent"; payload: string }
    | { type: "setNewError"; payload: string }
    | { type: "openEdit"; payload: Message }
    | { type: "setEditContent"; payload: string }
    | { type: "setEditError"; payload: string }
    | { type: "closeEdit" }
    | { type: "resetNewForm" }
    | { type: "resetEditForm" };

export const initialState: AppState = {
    newContent: "",
    newError: "",
    editingMessage: null,
    editContent: "",
    editError: ""
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case "setNewContent":
            return { ...state, newContent: action.payload };
        case "setNewError":
            return { ...state, newError: action.payload };
        case "openEdit":
            return {
                ...state,
                editingMessage: action.payload,
                editContent: action.payload.content,
                editError: ""
            };
        case "setEditContent":
            return { ...state, editContent: action.payload };
        case "setEditError":
            return { ...state, editError: action.payload };
        case "closeEdit":
            return { ...state, editingMessage: null, editError: "" };
        case "resetNewForm":
            return { ...state, newContent: "", newError: "" };
        case "resetEditForm":
            return { ...state, editingMessage: null, editContent: "", editError: "" };
        default:
            return state;
    }
};
