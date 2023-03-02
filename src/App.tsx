import { useMemo, memo } from "react";
import useLocalStorage from "./Hooks/useLocalStorage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./Components/NewNote";
import { NoteData, RawNote, Tag } from "./Models/NoteData";
import { v4 as uuid } from "uuid";
import NoteList from "./Components/NoteList";
import NoteLayout from "./Components/NoteLayout";
import Note from "./Components/Note";
import EditNote from "./Components/EditNote";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuid(), tagIds: tags.map((tag) => tag.id) },
    ]);
  };

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes): RawNote[] => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagIds: tags.map((tag) => tag.id),
          };
        } else {
          return note;
        }
      });
    });
  };

  const onDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const updateTag = (id: string, label: string) => {
    setTags((prev) => {
      return prev.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else return tag;
      });
    });
  };

  const deleteTag = (id: string) => {
    setTags((prev) => {
      return prev.filter((tag) => tag.id !== id);
    });
  };
  return (
    <>
      <BrowserRouter>
        <div className="m-6 ">
          <Routes>
            <Route
              path="/"
              element={
                <NoteList
                  availableTags={tags}
                  notes={notesWithTags}
                  updateTag={updateTag}
                  deleteTag={deleteTag}
                />
              }
            />
            <Route
              path="/new"
              element={
                <NewNote
                  onSubmit={onCreateNote}
                  onAddTag={addTag}
                  availableTags={tags}
                />
              }
            />
            <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
              {" "}
              {/*give it all notes cuz should find that specific note 
            with its id 
            */}
              <Route index element={<Note onDelete={onDeleteNote} />} />
              <Route
                path="edit"
                element={
                  <EditNote
                    onSubmit={onUpdateNote}
                    onAddTag={addTag}
                    availableTags={tags}
                  />
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default memo(App);
