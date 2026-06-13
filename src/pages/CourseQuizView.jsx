import HeaderWithMenu from "../components/HeaderWithMenu";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";

export default function CourseQuizView() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      <HeaderWithMenu />
      <div className="bg-[#040814] text-white flex items-center px-6 md:px-8 py-1 md:py-2 shadow-md">
        <div className="flex-1 pl-3 flex justify-start">
          <BackButton
            onClick={() => {
              navigate(`/course-module/${id}`);
            }}
            title={`Back to Modules ${id}`}
          />
        </div>
        <div className="font-bold text-base md:text-lg tracking-[0.25rem] text-center shrink-0">
          GENERATED COURSE
        </div>
        <div className="flex-1"></div>
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-8 py-6 md:py-8 flex flex-col text-black">
        <div className="flex items-center gap-4 mb-4">
          <h2
            className="text-xl md:text-3xl uppercase"
            style={{ color: "#000000" }}
          >
            {id ? `MODULE ${id}` : ""} Quiz
            <span className="text-black hover:text-gray-500 transition-colors font-normal pl-2 cursor-pointer">
              ☆
            </span>
          </h2>
        </div>
      </main>
    </div>
  );
}
