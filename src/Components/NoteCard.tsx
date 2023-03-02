import { memo } from "react";
import { simpilfiedNote } from "../Models/NoteData";
import { Link } from "react-router-dom";

const NoteCard = ({ title, tags, id }: simpilfiedNote): JSX.Element => {
  return (
    <Link to={`/${id}`} className="text-inherit no-underline ">
      <div className="gap-3 h-full rounded-lg flex flex-col items-center justify-center transition-all duration-100 ease-in-out hover:-translate-y-[5px] hover:shadow-[0_5px_8px_0_rgba(0,0,0,.2)] focus:-translate-y-[5px] focus:shadow-[0_5px_8px_0_rgba(0,0,0,.2)] p-6 border border-[rgba(0,0,0,.2)]">
        <span>{title}</span>
        {tags.length > 0 && (
          <div className="flex gap-2">
            {tags.map((tag) => (
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
    </Link>
  );
};

export default memo(NoteCard);
