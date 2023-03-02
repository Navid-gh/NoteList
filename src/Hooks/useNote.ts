import { useOutletContext } from "react-router-dom";
import { Note } from "../Models/NoteData";

export default function useNote() {
  return useOutletContext<Note>();
}
