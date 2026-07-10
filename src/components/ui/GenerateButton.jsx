export default function GenerateButton({ disabled, label = "Generate", type = "submit" }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center h-[52px] px-12 rounded-full font-bold text-lg border border-transparent transition-all duration-250 select-none
        ${
          disabled
            ? "bg-muted text-muted-foreground/60 cursor-not-allowed"
            : "bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        }`}
    >
      {label}
    </button>
  );
}
