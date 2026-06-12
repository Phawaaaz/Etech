import blackArrowIcon from "../assets/black-arrow.svg";

export default function ChatInputFooter() {
  return (
    <footer className="w-full max-w-2xl mt-8 mb-4 relative z-10">
      <div className="relative flex items-center w-full bg-[#030303] rounded-full p-1 pl-6 shadow-2xl border border-white/5">
        <input
          type="text"
          placeholder="Reply to E-A.I"
          className="flex-1 bg-transparent text-gray-300 placeholder-gray-400 outline-none py-2 md:py-3 text-sm md:text-base font-medium"
        />
        <button className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-[2.5rem] flex items-center justify-center text-black hover:bg-gray-200 transition-colors shrink-0 ml-4 group">
          <img src={blackArrowIcon} alt="Enter" className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
}
