import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import CourseListItem from "../components/CourseListItem";
import Header from "../components/Header";
import ChatInputFooter from "../components/ChatInputFooter";

export default function CourseIndexView() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#040814] text-white flex flex-col items-center justify-between p-6 md:p-8 font-sans overflow-x-hidden relative">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />
      <Header />
      <main className="w-full max-w-5xl flex flex-col items-center flex-1 relative z-10 pt-4">
        <div className="bg-white text-black mt-3 px-12 py-3 md:py-4 rounded-[1.25rem] font-black text-lg md:text-2xl tracking-wider shadow-[0_4px_25px_rgba(255,255,255,0.08)] mb-12 select-none text-center w-[90%] md:w-[70%] flex justify-center">
          GENERATED COURSE INDEX
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 w-full px-2 md:px-4 mb-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <CourseListItem key={num} number={num} />
          ))}
        </div>

        <BackButton onClick={() => navigate(-1)} />
      </main>
      <ChatInputFooter />
    </div>
  );
}
