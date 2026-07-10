export default function CourseListItem({ number, title, summary, duration, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded-2xl flex items-center gap-4 w-full shadow-md hover:shadow-lg cursor-pointer hover:bg-zinc-50 border border-zinc-150 transition-all hover:scale-[1.01] text-left"
    >
      <div className="w-12 h-12 bg-zinc-950 text-white rounded-xl flex items-center justify-center font-black text-lg shrink-0 select-none">
        {number}
      </div>
      <div className="flex-1 min-w-0 pr-2">
        <h4 className="text-zinc-900 font-extrabold text-base md:text-lg truncate select-none leading-snug">
          {title || `Section ${number}`}
        </h4>
        <p className="text-zinc-500 text-xs md:text-sm truncate mt-1 select-none">
          {summary || "Generate section materials to begin studying this module."}
        </p>
      </div>
      {duration && (
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full shrink-0 select-none">
          {duration}m
        </span>
      )}
    </div>
  );
}
