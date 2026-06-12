import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CourseListItem from "../components/CourseListItem";
import BackButton from "../components/BackButton";
import ChatInputFooter from "../components/ChatInputFooter";

export default function CourseIndexView() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#040814] text-white flex flex-col items-center p-4 md:p-6 font-sans overflow-x-hidden">
      <Header />

      <main className="w-full max-w-4xl flex flex-col items-center flex-1 py-6 md:py-8">
        <div className="bg-white text-black px-8 py-2 md:py-3 rounded-[1.25rem] font-black text-sm md:text-lg tracking-wider shadow-[0_4px_25px_rgba(255,255,255,0.08)] mb-8 select-none text-center w-[90%] md:w-[60%] flex justify-center shrink-0">
          GENERATED COURSE INDEX
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-3 md:gap-y-4 w-full px-2 md:px-8 mb-5 shrink-0">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <CourseListItem
              key={num}
              number={num}
              onClick={() => navigate(`/course-module/${num}`)}
            />
          ))}
        </div>

        <BackButton onClick={() => navigate(-1)} />
      </main>

      <ChatInputFooter />
    </div>
  );
}
