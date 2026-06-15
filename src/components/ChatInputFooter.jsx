import blackArrowIcon from "../assets/black-arrow.svg";

export default function ChatInputFooter() {
  return (
    <footer className="w-full max-w-2xl mt-4 mb-2 relative z-10 shrink-0 px-4 md:px-0">
      <div className="relative flex items-center w-full h-12 md:h-14">
        <div className="flex-1 bg-black h-full rounded-l-[1.25rem] flex items-center pl-6 md:pl-8 pr-8 shadow-2xl">
          <input
            type="text"
            placeholder="Reply to E-A.I"
            className="w-full bg-transparent text-white placeholder-gray-200 outline-none text-base md:text-lg font-medium"
          />
        </div>

        <button className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-[1.25rem] flex items-center justify-center text-black hover:bg-gray-200 transition-colors shrink-0 -ml-6 md:-ml-7 relative z-10 shadow-lg group border-2 border-white cursor-pointer">
          <img
            src={blackArrowIcon}
            alt="Enter"
            className="w-6 h-6 md:w-7 md:h-7 transform group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </footer>
  );
}
