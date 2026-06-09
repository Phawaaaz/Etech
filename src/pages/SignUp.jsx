import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import formFields from "../data/formFields";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center animate-fadeIn font-sans">
      <button
        onClick={() => navigate("/")}
        className="text-zinc-500 text-sm hover:text-white mb-10 transition-colors self-center font-semibold"
      >
        ← Back to Home
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full">
        {formFields.map((field) => (
          <SignUpForm
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
          />
        ))}
      </div>
    </div>
  );
}
