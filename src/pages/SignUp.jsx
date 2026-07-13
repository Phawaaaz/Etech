import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { toast } from "sonner";

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

    fetch("https://etechbackend.onrender.com/api/auth/register", {
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

        <form onSubmit={handleSignUpSubmit} className="mt-8 space-y-6">
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
