import { useNavigate } from "react-router-dom";

export default function SignBrandHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full absolute top-0 left-0 p-6">
      <div
        onClick={() => navigate("/")}
        className="bg-black text-white font-bold text-xl px-4 py-2 rounded-lg border border-gray-800 tracking-wider cursor-pointer select-none"
      >
        E-A.I
      </div>
    </div>
  );
}
