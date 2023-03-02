import { memo } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import useNote from "../Hooks/useNote";
import NoteProps from "../Models/Props/NoteProps";

const Note = ({ onDelete }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">{note.title}</h1>
          {note.tags.length > 0 && (
            <div className="flex gap-2">
              {note.tags.map((tag) => (
                <span
                  className="bg-[#007bff] rounded text-white p-1"
                  key={tag.id}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Link to={`/${note.id}/edit`}>
            <button className="px-2 py-1 rounded-[4px] transition-all border duration-300 bg-[#007bff] text-white text-[14px] hover:border-[#007bff] hover:bg-[white] hover:text-[#007bff]">
              Edit
            </button>
          </Link>
          <button
            className="px-2 py-1 rounded-[4px] transition-all duration-300 border border-[#dc3545] text-[#dc3545] text-[14px] hover:bg-[#dc3545] hover:text-white"
            onClick={() => {
              onDelete(note.id);
              navigate("..");
            }}
          >
            Delete
          </button>
          <Link to="/">
            <button className="px-2 py-1 rounded-[4px] transition-all duration-300 border border-[#6c757d] text-[#6c757d] text-[14px] hover:bg-[#6c757d] hover:text-white">
              Back
            </button>
          </Link>
        </div>
      </div>
      <ReactMarkdown>{note.body}</ReactMarkdown>
    </div>
  );
};

export default memo(Note);
