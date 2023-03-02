import { memo, useEffect, useState } from "react";
import { Note } from "../Models/NoteData";
import { useParams, Navigate, Outlet } from "react-router-dom";

const NoteLayout = ({ notes }: { notes: Note[] }) => {
  //const [note, setNote] = useState<Note>();
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);
  if (note == null) return <Navigate to="/" replace />;
  //   const Navigate = useNavigate();
  //   useEffect(() => {
  //     const note = notes.find((note) => note.id === id);
  //     if (note == null) Navigate("/");
  //     else setNote(note);
  //   }, [id]);
  // i commented thes cuz thats not that good to use effect here cuz first it get painted then setting the note
  // also for Navigate
  // if we used some api yes we should have use effec
  return <Outlet context={note} />;
};

export default memo(NoteLayout);
