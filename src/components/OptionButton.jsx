export default function OptionButton({ label, icon, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? "bg-blue-100 text-black border-2 border-blue-500 scale-105"
            : "bg-white text-black border-2 border-transparent hover:bg-gray-200 hover:scale-105"
        }`}
    >
      <img
        src={icon}
        alt={`${label} icon`}
        className="w-6 h-6 object-contain"
      />
      <span>{label}</span>
    </button>
  );
}
