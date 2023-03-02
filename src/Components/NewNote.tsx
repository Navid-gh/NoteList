import { memo } from "react";
import FormDataProps from "../Models/Props/NoteFormData";
import NoteForm from "./NoteForm";

const NewNote = ({
  onSubmit,
  onAddTag,
  availableTags,
}: FormDataProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="font-bold text-[16px]">New Note</div>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default memo(NewNote);
