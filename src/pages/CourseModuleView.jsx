import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import HeaderWithMenu from "../components/HeaderWithMenu";

export default function CourseModuleView() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      <HeaderWithMenu />
      <div className="bg-[#040814] text-white flex items-center px-6 md:px-8 py-1 md:py-2 shadow-md">
        <div className="flex-1 pl-3 flex justify-start">
          <BackButton
            onClick={() => navigate("/course-index")}
            title="Back to Course Modules"
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
            {id ? `MODULE ${id}` : ""} TUTORIAL
            <span className="text-black hover:text-gray-500 transition-colors font-normal pl-2 cursor-pointer">
              ☆
            </span>
          </h2>
        </div>
        <div className="flex justify-end mb-6">
          <button className="bg-[#040814] text-white px-8 md:px-10 py-2.5 rounded-lg font-bold text-sm md:text-base hover:bg-gray-700 transition-colors shadow-lg cursor-pointer focus:scale-90">
            Next
          </button>
        </div>

        <p
          className="text-sm md:text-[15px] font-bold text-black leading-relaxed text-left px-2 md:px-9"
          style={{ marginBottom: "1.25rem" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris orci
          magna, dictum eget elit sed, tincidunt vehicula dui. Vestibulum dictum
          fringilla turpis, et ultricies dolor ornare non. Duis ut sodales
          neque. Mauris pretium malesuada dolor, in interdum lorem fringilla
          eget. Morbi quis dui quis purus laoreet interdum. In sagittis tempor
          tempor. Sed vitae sapien odio. Fusce sit amet mauris viverra, luctus
          sem sit amet, faucibus arcu. Suspendisse scelerisque ultrices
          eleifend. Suspendisse hendrerit turpis eu justo dignissim commodo.
          Nunc faucibus elementum nunc sed finibus. Sed pellentesque vulputate
          sapien pretium feugiat. Praesent nec auctor arcu. Quisque at lacus nec
          urna vulputate pellentesque vitae at ex. Phasellus quam orci, maximus
          at massa ut, aliquet maximus lorem. Praesent tincidunt enim nunc, a
          auctor orci placerat eu. Nullam sit amet sem id ipsum aliquam cursus.
          Etiam accums
        </p>

        <div className="bg-[#040814] text-white rounded-xl p-6 md:p-8 mb-6 shadow-xl shrink-0">
          <h3 className="font-bold text-lg mb-2 text-left">Example:</h3>
          <p className="text-sm md:text-[15px] font-medium leading-relaxed text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris orci
            magna, dictum eget elit sed, tincidunt vehicula dui. Vestibulum
            dictum fringilla turpis, et ultricies dolor ornare non. Duis ut
            sodales neque. Mauris pretium malesuada dolor, in interdum lorem
            fringilla eget. Morbi quis dui quis purus laoreet interdum. In sagi
          </p>
        </div>

        <div className="flex justify-end pb-4 shrink-0">
          <button className="bg-[#040814] text-white px-6 md:px-8 py-2.5 rounded-lg font-bold text-sm md:text-base hover:bg-gray-700 transition-colors shadow-lg cursor-pointer focus:scale-90">
            Generate image
          </button>
        </div>
      </main>
    </div>
  );
}
