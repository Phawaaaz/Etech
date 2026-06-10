import SignBrandHeader from "../components/SignBrandHeader";
import formFields from "../data/formFields";
import SignUpForm from "../components/SignUpForm";

export default function Login() {
  const emailField = formFields.find((field) => field.name === "email");
  const passwordField = formFields.find((field) => field.name === "password");
  return (
    <>
      <SignBrandHeader />
      <div className="w-full max-w-xl mx-auto px-4 flex flex-col items-center justify-center min-h-[70vh] animate-fadeIn font-sans">
        <div className="w-full bg-[#04060E] border border-zinc-900 rounded-2xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col">
          <form className="w-full flex flex-col gap-6">
            {emailField && (
              <SignUpForm
                label={emailField.label}
                name={emailField.name}
                type={emailField.type}
              />
            )}

            {passwordField && (
              <SignUpForm
                label={passwordField.label}
                name={passwordField.name}
                type={passwordField.type}
              />
            )}

            <button
              type="button"
              className="text-white text-sm font-bold hover:underline self-end tracking-wide mb-4 transition-all bg-transparent outline-none cursor-pointer border-none"
            >
              Forgot Password ?
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
