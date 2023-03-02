import { memo, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag, Note } from "../Models/NoteData";
import EditTagsModal from "./EditTagsModal";
import NoteCard from "./NoteCard";

const NoteList = ({
  availableTags,
  notes,
  deleteTag,
  updateTag,
}: {
  availableTags: Tag[];
  notes: Note[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
}): JSX.Element => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, title, selectedTags]);

  const modalHandler = () => {
    setShowModal(true);
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2 justify-between">
        <h1>Notes</h1>
        <div className="flex gap-4">
          <Link to="/new">
            <button className="px-2 py-1 rounded-[4px] transition-all border duration-300 bg-[#007bff] text-white text-[14px] hover:border-[#007bff] hover:bg-[white] hover:text-[#007bff]">
              Create
            </button>
          </Link>
          <button
            className="px-2 py-1 rounded-[4px] transition-all duration-300 border border-[#6c757d] text-[#6c757d] text-[14px] hover:bg-[#6c757d] hover:text-white"
            onClick={modalHandler}
          >
            EditTags
          </button>
        </div>
      </div>
      <div className="flex gap-[2%] flex-wrap">
        <div className="flex flex-col  gap-1 flex-[1_1_49%] max-w-[49%] mobile:max-w-[100%] mobile:flex-[1_1_100%]">
          <label htmlFor="title">Title</label>
          <input
            className="p-2 h-[38px] border outline-0 border-[rgb(0,0,0,20%)] rounded-lg "
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 flex-[1_1_49%] max-w-[49%] mobile:max-w-[100%] mobile:flex-[1_1_100%]">
          <label htmlFor="Tags">Tags</label>
          <ReactSelect
            value={selectedTags.map((tag) => {
              return { label: tag.label, id: tag.id };
            })}
            options={availableTags.map((tag) => {
              return { label: tag.label, id: tag.id };
            })}
            isMulti
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.id };
                })
              );
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-[2%]">
        {filteredNotes.map((notes) => (
          <div
            key={notes.id}
            className="max-w-[49%] flex-[1_1_49%] mobile:max-w-[100%] mobile:flex-[1_1_100%] mb-[2%]"
          >
            <NoteCard id={notes.id} title={notes.title} tags={notes.tags} />
          </div>
        ))}
      </div>
      <EditTagsModal
        show={showModal}
        setShow={setShowModal}
        availableTags={availableTags}
        deleteTag={deleteTag}
        updateTag={updateTag}
      />
    </div>
  );
};

export default memo(NoteList);
