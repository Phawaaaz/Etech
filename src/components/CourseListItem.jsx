export default function CourseListItem({ number }) {
  return (
    <div className="bg-white h-10 md:h-12 rounded-[1.25rem] flex items-center w-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#050505] text-white rounded-[1.25rem] flex items-center justify-center font-bold text-base md:text-lg shrink-0">
        {number}
      </div>
    </div>
  );
}
