import { memo, useRef, useState } from "react";
import CreatableReactSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import FormDataProps from "../Models/Props/NoteFormData";
import { NoteData, Tag } from "../Models/NoteData";
import { v4 as uuid } from "uuid";

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  body = "",
  tags = [],
  title = "",
}: FormDataProps & Partial<NoteData>): JSX.Element => {
  //but you could to not to use the partial cuz you set the default values
  const titleRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const Navigate = useNavigate();

  const handleClick = () => {
    onSubmit({
      body: textAreaRef.current!.value,
      title: titleRef.current!.value,
      tags: selectedTags,
    });

    Navigate("..");
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-[2%] flex-wrap">
        <div className="flex flex-col  gap-1 flex-[1_1_49%] max-w-[49%] mobile:max-w-[100%] mobile:flex-[1_1_100%]">
          <label htmlFor="title">Title</label>
          <input
            className="p-2 h-[38px] border outline-0 border-[rgb(0,0,0,20%)] rounded-lg "
            type="text"
            id="title"
            required
            ref={titleRef}
            defaultValue={title}
          />
        </div>
        <div className="flex flex-col gap-1 flex-[1_1_49%] max-w-[49%] mobile:max-w-[100%] mobile:flex-[1_1_100%]">
          <label htmlFor="Tags">Tags</label>
          <CreatableReactSelect
            onCreateOption={(label) => {
              const newTag = { label, id: uuid() };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
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
      <div className="flex flex-col gap-2">
        <label>Body</label>
        <textarea
          className="outline-0 border border-[rgb(0,0,0,0.2)] rounded-lg focus:border-[#ff5900] p-2 transition-[border] duration-300"
          rows={15}
          required
          ref={textAreaRef}
          defaultValue={body}
        />
      </div>
      <div className="flex gap-4 w-full justify-end">
        <button className="p-2 " onClick={handleClick}>
          Save
        </button>
        <Link to="..">
          <button className="p-2 ">Cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default memo(NoteForm);
