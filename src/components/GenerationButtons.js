import React from "react";

const GenerationButtons = (props) => {
  const buttonClickHandler = (e) => {
    props.onClick(e.target.id)
  }
  return (
    <div className="absolute ml-[-210px]" style={{zIndex: 1}}>
      <div className="mt-[220px] -rotate-90">
        <div className="flex gap-1 flex-row-reverse">
          <button
            id="gen1"
            className="m-1 px-5 py-1 border-[#4f045a] border rounded-t-[30px] bg-[#ff0050] text-white hover:bg-[#dc0059]"
            onClick={buttonClickHandler}
          >
            Gen 1
          </button>
          <button
            id="gen2"
            className="m-1 px-5 py-1 border-[#4f045a] border rounded-t-[30px] bg-[#ff0050] text-white hover:bg-[#dc0059]"
            onClick={buttonClickHandler}
          >
            Gen 2
          </button>
          <button
            id="gen3"
            className="m-1 px-5 py-1 border-[#4f045a] border rounded-t-[25px] bg-[#ff0050] text-white hover:bg-[#dc0059]"
            onClick={buttonClickHandler}
          >
            Gen 3
          </button>
          <button
            id="gen4"
            className="m-1 px-5 py-1 border-[#4f045a] border rounded-t-[25px] bg-[#ff0050] text-white hover:bg-[#dc0059]"
            onClick={buttonClickHandler}
          >
            Gen 4
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerationButtons;
