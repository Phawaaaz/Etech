import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignBrandHeader from "../components/SignBrandHeader";
import formFields from "../data/formFields";
import SignUpForm from "../components/SignUpForm";

export default function Login() {
  const emailField = formFields.find((field) => field.name === "email");
  const passwordField = formFields.find((field) => field.name === "password");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");

  const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isEmailValid = validateEmailFormat(loginData.email);
  const isFormComplete =
    loginData.email.trim() !== "" && loginData.password.trim() !== "";
  const isFormValid = isFormComplete && isEmailValid;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (value.trim() === "" || validateEmailFormat(value)) {
        setEmailError("");
      } else {
        setEmailError("Invalid email structure (e.g., name@domain.com)");
      }
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      setEmailError(
        "Please enter a valid email address containing '@' and standard domain extension",
      );
      return;
    }

    console.log(
      "Authentication pipeline execution payload verified:",
      loginData,
    );
  };

  const navigate = useNavigate();
  return (
    <>
      <SignBrandHeader />
      <div className="w-full max-w-xl mx-auto my-auto px-4 flex flex-col items-center justify-center min-h-[70vh] animate-fadeIn font-sans">
        <div className="w-full bg-[#04060E] border border-zinc-900 rounded-2xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col">
          <form
            onClick={handleLoginSubmit}
            className="w-full flex flex-col gap-6"
          >
            {emailField && (
              <div className="flex flex-col w-full">
                <SignUpForm
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
              <SignUpForm
                label={passwordField.label}
                name={passwordField.name}
                type={passwordField.type}
                value={loginData[passwordField.name]}
                onChange={handleInputChange}
              />
            )}

            <button
              type="button"
              className="text-white text-sm font-bold hover:underline self-end tracking-wide mb-4 transition-all bg-transparent outline-none cursor-pointer border-none"
            >
              Forgot Password ?
            </button>

            <div className="flex items-center justify-center gap-5 w-full max-w-sm mx-auto mt-4">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`flex-1 py-3 px-8 rounded-xl font-bold text-xl tracking-wide transition-all duration-300 border-2 border-transparent
                  ${
                    !isFormValid
                      ? "bg-white/20 text-zinc-500 cursor-not-allowed"
                      : "bg-white text-black hover:bg-transparent hover:text-white hover:border-white shadow-md active:scale-95 cursor-pointer"
                  }`}
              >
                Sign in
              </button>

              <button
                type="button"
                onClick={() => navigate("/sign-up")}
                className="text-white text-base font-bold leading-tight hover:text-zinc-300 text-left transition-colors cursor-pointer tracking-wide whitespace-pre-line max-w-[120px] select-none bg-transparent outline-none border-none"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
