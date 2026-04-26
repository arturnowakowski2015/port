import { useMemo, useReducer, type FormEvent } from "react";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./components/ui/button/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "./components/ui/card/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./components/ui/dialog/dialog";
import { Label } from "./components/ui/label/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./components/ui/table/table";
import { Textarea } from "./components/ui/textarea/textarea";
import {
    type Message,
    useAddMessageMutation,
    useDeleteMessageMutation,
    useGetMessagesQuery,
    useUpdateMessageMutation
} from "./features/messages/messagesApi";
import { appReducer, initialState } from "./features/messages/messagesReducer";
import styles from "./App.module.css";

const MAX_CONTENT_LENGTH = 500;

const validateMessage = (value: string): string => {
    const trimmed = value.trim();

    if (!trimmed) {
        return "Wiadomosc nie moze byc pusta.";
    }

    if (trimmed.length > MAX_CONTENT_LENGTH) {
        return `Wiadomosc nie moze przekraczac ${MAX_CONTENT_LENGTH} znakow.`;
    }

    return "";
};

function App(): JSX.Element {
    const { data: messages = [], isLoading, isError } = useGetMessagesQuery();
    const [addMessage, { isLoading: isAdding }] = useAddMessageMutation();
    const [updateMessage, { isLoading: isUpdating }] = useUpdateMessageMutation();
    const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

    const [state, dispatch] = useReducer(appReducer, initialState);
    const { newContent, newError, editingMessage, editContent, editError } = state;

    const busyDelete = isDeleting;

    const handleAdd = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const validationError = validateMessage(newContent);
        dispatch({ type: "setNewError", payload: validationError });

        if (validationError) {
            return;
        }

        await addMessage({ content: newContent.trim() }).unwrap();
        dispatch({ type: "resetNewForm" });
    };

    const openEditModal = (message: Message): void => {
        dispatch({ type: "openEdit", payload: message });
    };

    const handleEdit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (!editingMessage) {
            return;
        }

        const validationError = validateMessage(editContent);
        dispatch({ type: "setEditError", payload: validationError });

        if (validationError) {
            return;
        }

        await updateMessage({ id: editingMessage.id, content: editContent.trim() }).unwrap();
        dispatch({ type: "resetEditForm" });
    };

    const handleDelete = async (id: number): Promise<void> => {
        const confirmed = window.confirm("Czy na pewno chcesz usunac te wiadomosc?");

        if (!confirmed) {
            return;
        }

        await deleteMessage(id).unwrap();
    };

    return (
        <div className={styles.container}>
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle>Panel wiadomosci</CardTitle>
                        <CardDescription>Dodawanie nowych wiadomosci</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAdd}>
                            <Label htmlFor="message-content">Nowa wiadomosc</Label>
                            <Textarea
                                id="message-content"
                                value={newContent}
                                onChange={(event) =>
                                    dispatch({ type: "setNewContent", payload: event.target.value })
                                }
                                placeholder="Wpisz tresc wiadomosci..."
                                maxLength={MAX_CONTENT_LENGTH}
                            />
                            {newError ? <p className={styles.error}>{newError}</p> : null}
                            <div className={styles.flexRow}>
                                <p className={styles.counter}>
                                    {newContent.length}/{MAX_CONTENT_LENGTH}
                                </p>
                                <Button disabled={isAdding} type="submit">
                                    {isAdding ? "Dodawanie..." : "Dodaj wiadomosc"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista wiadomosci</CardTitle>
                        <CardDescription>Tabela</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <p>Ladowanie danych...</p> : null}
                        {isError ? (
                            <p className={styles.error}>Nie udalo sie pobrac wiadomosci.</p>
                        ) : null}
                        {!isLoading && !isError ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className={styles.tableHead}>ID</TableHead>
                                        <TableHead>Wiadomosc</TableHead>
                                        <TableHead className={styles.tableHead}>Akcje</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {messages.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className={styles.tableEmpty}>
                                                Brak wiadomosci.
                                            </TableCell>
                                        </TableRow>
                                    ) : null}
                                    {messages.map((message) => (
                                        <TableRow key={message.id}>
                                            <TableCell>{message.id}</TableCell>
                                            <TableCell>{message.content}</TableCell>
                                            <TableCell>
                                                <div className={styles.flexRow}>
                                                    <Dialog
                                                        open={editingMessage?.id === message.id}
                                                        onOpenChange={(open) => {
                                                            if (!open) {
                                                                dispatch({ type: "closeEdit" });
                                                            }
                                                        }}
                                                    >
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="secondary"
                                                                size="sm"
                                                                onClick={() => openEditModal(message)}
                                                            >
                                                                <Pencil />
                                                                Edytuj
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Edycja wiadomosci</DialogTitle>
                                                                <DialogDescription>
                                                                    Zmien tresc wiadomosci i zapisz aktualizacje.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <form onSubmit={handleEdit}>
                                                                <Label htmlFor="edit-content">Wiadomosc</Label>
                                                                <Textarea
                                                                    id="edit-content"
                                                                    value={editContent}
                                                                    onChange={(event) =>
                                                                        dispatch({
                                                                            type: "setEditContent",
                                                                            payload: event.target.value
                                                                        })
                                                                    }
                                                                    maxLength={MAX_CONTENT_LENGTH}
                                                                />
                                                                {editError ? (
                                                                    <p className={styles.error}>{editError}</p>
                                                                ) : null}
                                                                <div className={styles.flexRow}>
                                                                    <Button
                                                                        variant="outline"
                                                                        type="button"
                                                                        onClick={() => dispatch({ type: "closeEdit" })}
                                                                    >
                                                                        Anuluj
                                                                    </Button>
                                                                    <Button disabled={isUpdating} type="submit">
                                                                        {isUpdating ? "Zapisywanie..." : "Zapisz"}
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(message.id)}
                                                        disabled={busyDelete}
                                                    >
                                                        <Trash2 />
                                                        Usun
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : null}
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}

export default App;
