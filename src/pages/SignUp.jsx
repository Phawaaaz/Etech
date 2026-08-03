import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { toast } from "sonner";
import { handleGoogleAuth } from "../utils/googleAuth";

const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "https://etechbackend.onrender.com/api";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.gender !== "" &&
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "" &&
    !submitting;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isFormValid) {
        handleSignUpSubmit(e);
      } else {
        e.preventDefault();
      }
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setSubmitting(true);
    const signUpToastId = toast.loading("Creating your account...");

    fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        password: formData.password,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || "Registration failed.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          // New registers go to onboarding
          localStorage.removeItem("onboarded");
          toast.success("Account created successfully!", { id: signUpToastId });
          navigate("/onboarding");
        } else {
          toast.error("Registration failed.", { id: signUpToastId });
        }
      })
      .catch((err) => {
        toast.error(err.message, { id: signUpToastId });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center p-4 font-sans select-text relative overflow-hidden w-full">
      {/* Ambient background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 bg-card border border-border p-8 sm:p-10 rounded-3xl shadow-sm relative z-10">
        
        <div className="flex flex-col items-center select-none">
          <div className="mb-4">
            <Logo />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-zinc-950 uppercase">Create Account</h2>
          <p className="mt-2 text-sm text-muted-foreground font-medium">Please enter your details to register.</p>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={() => handleGoogleAuth(navigate)}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-full border border-border bg-card hover:bg-muted transition-all font-semibold text-sm text-foreground shadow-sm hover:shadow-md active:scale-95"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider select-none">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSignUpSubmit} className="space-y-6">
          <div className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground text-left mb-1.5 select-none">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={submitting}
                className={`block w-full rounded-2xl border border-border/80 bg-zinc-50 px-4 py-3 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 sm:text-sm font-semibold transition-all shadow-3xs ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                placeholder="Please enter a name"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground text-left mb-1.5 select-none">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={submitting}
                className={`block w-full rounded-2xl border border-border/80 bg-zinc-50 px-4 py-3 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 sm:text-sm font-semibold transition-all shadow-3xs ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                placeholder="you@example.com"
              />
            </div>

            {/* Gender Select */}
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground text-left mb-1.5 select-none">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={submitting}
                className={`block w-full rounded-2xl border border-border/80 bg-zinc-50 px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 sm:text-sm font-semibold cursor-pointer ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <option value="" disabled hidden>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground text-left mb-1.5 select-none">
                Create Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={submitting}
                className={`block w-full rounded-2xl border border-border/80 bg-zinc-50 px-4 py-3 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 sm:text-sm font-semibold transition-all shadow-3xs ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground text-left mb-1.5 select-none">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={submitting}
                className={`block w-full rounded-2xl border border-border/80 bg-zinc-50 px-4 py-3 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 sm:text-sm font-semibold transition-all shadow-3xs ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                placeholder="••••••••"
              />
            </div>

          </div>

          <div className="flex flex-col gap-4 select-none">
            <button
              type="submit"
              disabled={!isFormValid || submitting}
              className={`group relative flex w-full justify-center px-4 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-250 hover:-translate-y-0.5 active:translate-y-0 rounded-full shadow-sm select-none cursor-pointer border-none ${
                !isFormValid || submitting
                  ? "bg-muted text-muted-foreground/60 cursor-not-allowed border border-transparent"
                  : "bg-primary text-primary-foreground hover:bg-primary/95 hover:shadow-md"
              }`}
            >
              {submitting ? "Registering..." : "Register"}
            </button>

            <div className="text-center text-sm text-gray-500 mt-2">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                disabled={submitting}
                className={`font-bold text-black hover:underline underline-offset-4 cursor-pointer bg-transparent border-none outline-none ${
                  submitting ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                }`}
              >
                Sign In
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
