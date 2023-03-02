import { NoteData } from "../NoteData";
import { Tag } from "../NoteData";

export default interface FormDataProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}
