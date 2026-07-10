import { useNavigate } from "react-router-dom";
import InputField from "@/components/ui/InputField";
import formFields from "@/data/formFields";

export default function LoginForm({
  loginData,
  emailError,
  handleInputChange,
  handleLoginSubmit,
  isFormValid,
}) {
  const navigate = useNavigate();
  const emailField = formFields.find((field) => field.name === "email");
  const passwordField = formFields.find((field) => field.name === "password");

  return (
    <form onSubmit={handleLoginSubmit} className="w-full flex flex-col gap-6">
      {emailField && (
        <div className="flex flex-col w-full">
          <InputField
            label={emailField.label}
            name={emailField.name}
            type={emailField.type}
            value={loginData[emailField.name]}
            onChange={handleInputChange}
          />
          {emailError && (
            <span className="text-red-500 font-bold text-sm tracking-wide mt-2 pl-4 animate-fadeIn">
              ⚠️ {emailError}
            </span>
          )}
        </div>
      )}

      {passwordField && (
        <InputField
          label={passwordField.label}
          name={passwordField.name}
          type={passwordField.type}
          value={loginData[passwordField.name]}
          onChange={handleInputChange}
        />
      )}

      <button
        type="button"
        className="text-muted-foreground hover:text-foreground text-sm font-semibold hover:underline self-end tracking-wide mb-4 transition-all bg-transparent outline-none cursor-pointer border-none"
      >
        Forgot Password?
      </button>

      <div className="flex items-center justify-center gap-5 w-full max-w-sm mx-auto mt-4">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`flex-1 h-[52px] px-8 rounded-full font-bold text-lg tracking-wide transition-all duration-250 border border-transparent
            ${
              !isFormValid
                ? "bg-muted text-muted-foreground/60 cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            }`}
        >
          Sign in
        </button>

        <button
          type="button"
          onClick={() => navigate("/sign-up")}
          className="text-foreground hover:text-primary text-base font-bold leading-tight text-left transition-colors duration-250 cursor-pointer tracking-wide whitespace-pre-line max-w-[120px] select-none bg-transparent outline-none border-none"
        >
          Create
          account
        </button>
      </div>
    </form>
  );
}
