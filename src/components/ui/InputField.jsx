export default function InputField({ label, type, name, value, onChange }) {
  return (
    <div className="bg-card text-foreground h-[52px] px-6 rounded-full flex items-center shadow-sm border border-border focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
      <label className="text-base font-bold mr-3 select-none shrink-0">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="w-full bg-transparent text-base font-semibold focus:outline-none placeholder-muted-foreground/60"
      />
    </div>
  );
}
