import { NoteData } from "../NoteData";
import FormDataProps from "./NoteFormData";
export type EditNoteProps = Omit<FormDataProps, "onSubmit"> & {
  onSubmit: (id: string, data: NoteData) => void;
};
