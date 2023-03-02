import { memo } from "react";
import { EditNoteProps } from "../Models/Props/EditNoteProps";
import NoteForm from "./NoteForm";
import useNote from "../Hooks/useNote";

const EditNote = ({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps): JSX.Element => {
  const note = useNote();
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="font-bold text-[16px]">Edit Note</div>
      <NoteForm
        title={note.title}
        body={note.body}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default memo(EditNote);
