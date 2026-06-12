import Header from "../components/Header";

export default function CourseIndexView() {
  return (
    <div className="min-h-screen bg-[#040814] text-white flex flex-col items-center justify-between p-6 md:p-8 font-sans overflow-x-hidden relative">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />
      <Header />
    </div>
  );
}
