export default function GenerateButton({ disabled, label = "Generate", type = "submit" }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-12 py-3 rounded-full font-bold text-xl border border-transparent transition-all duration-300
        ${
          disabled
            ? "bg-black text-zinc-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-zinc-900 shadow-[0_5px_15px_rgba(0,0,0,0.1)] hover:scale-105 cursor-pointer"
        }`}
    >
      {label}
    </button>
  );
}
