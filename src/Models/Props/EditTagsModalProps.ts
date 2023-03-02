import React from "react";
import { Tag } from "../NoteData";

export default interface EditTagsModalProps {
  availableTags: Tag[];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
}
