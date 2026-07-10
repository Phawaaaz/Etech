export default function OptionButton({ label, icon, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-250 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer
        ${
          isSelected
            ? "bg-primary/10 text-primary border-2 border-primary shadow-sm"
            : "bg-card text-foreground border-2 border-border hover:bg-muted"
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
