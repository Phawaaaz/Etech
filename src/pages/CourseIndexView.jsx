export default function CourseIndexView() {
  return (
    <div className="min-h-screen bg-[#040814] text-white flex flex-col items-center justify-between p-6 md:p-8 font-sans overflow-x-hidden relative">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

      <header className="w-full max-w-5xl flex justify-between items-center mb-10 relative z-10">
        <button
          className="text-white hover:text-indigo-400 transition-colors p-2 cursor-pointer focus:outline-none"
          title="Menu"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="5" cy="6" r="2" />
            <rect x="10" y="5" width="12" height="2" rx="1" />
            <circle cx="5" cy="12" r="2" />
            <rect x="10" y="11" width="12" height="2" rx="1" />
            <circle cx="5" cy="18" r="2" />
            <rect x="10" y="17" width="12" height="2" rx="1" />
          </svg>
        </button>
        <div className="bg-white text-black px-8 md:px-12 py-3 rounded-full font-black text-sm md:text-lg tracking-wider shadow-[0_4px_25px_rgba(255,255,255,0.08)] border border-white/95 select-none text-center">
          GENERATED COURSE INDEX
        </div>
      </header>
    </div>
  );
}
