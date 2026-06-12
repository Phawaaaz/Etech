export default function ChatInputFooter() {
  return (
    <footer>
      <div className="relative flex items-center w-full bg-[#030303] rounded-full p-1 pl-6 shadow-2xl border border-white/5">
        <input
          type="text"
          placeholder="Reply to E-A.I"
          className="flex-1 bg-transparent text-gray-300 placeholder-gray-400 outline-none py-2 md:py-3 text-sm md:text-base font-medium"
        />
      </div>
    </footer>
  );
}
