export default function InputField({ label, type, name, value, onChange }) {
  return (
    <div className="bg-[#EAEBED] text-black px-6 py-4 rounded-xl flex items-center shadow-md border border-zinc-200/10">
      <label className="text-xl font-bold mr-3 select-none shrink-0">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="w-full bg-transparent text-xl font-semibold focus:outline-none placeholder-zinc-400"
      />
    </div>
  );
}
