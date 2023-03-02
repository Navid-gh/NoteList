import { memo } from "react";
import EditTagsModalProps from "../Models/Props/EditTagsModalProps";

const EditTagsModal = ({
  availableTags,
  show,
  setShow,
  deleteTag,
  updateTag,
}: EditTagsModalProps) => {
  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center transition-all duration-200 z-10 ${
        show ? "translate-x-0" : "translate-x-full"
      } ${show ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white p-4 w-[50%] mobile:w-[90%] h-auto rounded-lg flex flex-col gap-3 transition-all duration-300 z-20 ${
          show ? "translate-x-0" : "translate-x-full"
        }
        ${show ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="flex items-center justify-between border-b border-b-[rgba(0,0,0,0.1)] pb-2">
          <h1>Edit Tags</h1>
          <button
            className="px-2 py-1 rounded-[4px] transition-all border duration-300 bg-[#007bff] text-white text-[14px] hover:border-[#007bff] hover:bg-[white] hover:text-[#007bff]"
            onClick={() => setShow(false)}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {availableTags.map((tag) => {
            return (
              <div className="w-full flex gap-[2%]" key={tag.id}>
                {/* <span className="flex-[1_1_90%] flex items-center p-2 border border-[rgba(0,0,0,0.1)] rounded-lg">
                  {tag.label}
                </span> */}
                <input
                  value={tag.label}
                  type="text"
                  className="flex-[1_1_90%] flex items-center p-2 outline-0 border border-[rgba(0,0,0,0.1)] rounded-lg"
                  onChange={(e) => updateTag(tag.id, e.target.value)}
                />
                <span
                  className="flex-[1_1_2%] cursor-pointer flex justify-center items-center p-2 border border-[rgb(220,53,69,40%)] rounded-lg "
                  onClick={() => deleteTag(tag.id)}
                >
                  &times;
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(EditTagsModal);
