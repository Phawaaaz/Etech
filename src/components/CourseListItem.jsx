export default function CourseListItem({ number }) {
  return (
    <div className="bg-white h-[3.25rem] md:h-[3.75rem] rounded-full flex items-center p-1 w-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
      <div className="w-[2.75rem] h-[2.75rem] md:w-[3.25rem] md:h-[3.25rem] bg-black text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
        {number}
      </div>
    </div>
  );
}
