import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import formFields from "../data/formFields";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = Object.values(formData).every(
    (field) => field.trim() !== "",
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center animate-fadeIn font-sans">
      <button
        onClick={() => navigate("/")}
        className="text-zinc-500 text-sm hover:text-white mb-10 transition-colors self-center font-semibold"
      >
        ← Back to Home
      </button>

      <form className="w-full flex flex-col items-center gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full">
          {formFields.map((field) => (
            <SignUpForm
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`px-14 py-3.5 rounded-xl font-bold text-xl tracking-wide transition-all duration-300 mt-4 border-2 border-transparent
            ${
              !isFormValid
                ? "bg-white/20 text-zinc-500 cursor-not-allowed"
                : "bg-white text-black hover:bg-transparent hover:text-white hover:border-white shadow-[0_5px_20px_rgba(255,255,255,0.05)] scale-100 hover:scale-105 active:scale-95 cursor-pointer"
            }`}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
